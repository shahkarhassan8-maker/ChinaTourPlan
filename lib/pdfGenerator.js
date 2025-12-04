import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a PDF for the itinerary
 * @param {Object} params - PDF generation parameters
 * @param {Array} params.itinerary - Array of day objects
 * @param {Object} params.formData - Form data with trip details
 * @param {string} params.title - PDF title
 * @returns {jsPDF} - The generated PDF document
 */
export function generateItineraryPDF({ itinerary, formData, title }) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Colors
    const primaryColor = [230, 0, 18]; // #E60012
    const darkColor = [30, 41, 59]; // slate-800
    const grayColor = [100, 116, 139]; // slate-500
    const lightGray = [241, 245, 249]; // slate-100

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight = 40) => {
        if (yPos + requiredHeight > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
            return true;
        }
        return false;
    };

    // Header Background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(title || 'China Travel Itinerary', pageWidth / 2, 25, { align: 'center' });

    // Subtitle
    const cityNames = [...new Set(itinerary.map(d => d.city))].join(' → ');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(cityNames, pageWidth / 2, 38, { align: 'center' });

    yPos = 65;

    // Trip Summary Box
    const duration = formData?.duration || itinerary.length;
    const totalCost = itinerary.reduce((sum, day) => sum + (day.cost?.usd || 0), 0);
    const citiesCount = [...new Set(itinerary.map(d => d.city))].length;

    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 30, 3, 3, 'F');

    doc.setTextColor(...darkColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const summaryY = yPos + 12;
    const colWidth = (pageWidth - margin * 2) / 3;

    // Duration
    doc.text('DURATION', margin + colWidth / 2, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`${duration} Days`, margin + colWidth / 2, summaryY + 10, { align: 'center' });

    // Cities
    doc.setFontSize(10);
    doc.text('CITIES', margin + colWidth + colWidth / 2, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`${citiesCount}`, margin + colWidth + colWidth / 2, summaryY + 10, { align: 'center' });

    // Cost
    doc.setFontSize(10);
    doc.text('EST. COST', margin + colWidth * 2 + colWidth / 2, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(22, 163, 74); // green
    doc.text(`$${totalCost}`, margin + colWidth * 2 + colWidth / 2, summaryY + 10, { align: 'center' });

    yPos += 45;

    // Day by Day Itinerary
    itinerary.forEach((day, index) => {
        checkPageBreak(80);

        // Day Header
        doc.setFillColor(...primaryColor);
        doc.roundedRect(margin, yPos, pageWidth - margin * 2, 12, 2, 2, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`Day ${day.dayNumber || index + 1}: ${day.title || day.city}`, margin + 5, yPos + 8);

        // City badge
        if (day.cityChinese) {
            doc.setFontSize(10);
            doc.text(day.cityChinese, pageWidth - margin - 5, yPos + 8, { align: 'right' });
        }

        yPos += 18;

        // Day Content Box
        doc.setFillColor(...lightGray);
        const contentStartY = yPos;

        doc.setTextColor(...darkColor);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Activities
        if (day.activities && day.activities.length > 0) {
            doc.setFont('helvetica', 'bold');
            doc.text('Activities:', margin + 5, yPos);
            doc.setFont('helvetica', 'normal');
            yPos += 5;

            day.activities.forEach(activity => {
                checkPageBreak(8);
                const actName = typeof activity === 'string' ? activity : activity.name || activity;
                doc.setTextColor(...grayColor);
                doc.text(`• ${actName}`, margin + 10, yPos);
                yPos += 5;
            });
            yPos += 3;
        }

        // Food
        if (day.food) {
            checkPageBreak(10);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.text('Food:', margin + 5, yPos);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...grayColor);
            const foodName = typeof day.food === 'string' ? day.food : day.food.name || day.food;
            doc.text(foodName, margin + 25, yPos);
            yPos += 7;
        }

        // Hotel
        if (day.hotel) {
            checkPageBreak(10);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.text('Stay:', margin + 5, yPos);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...grayColor);
            const hotelName = typeof day.hotel === 'string' ? day.hotel : day.hotel.name || day.hotel;
            doc.text(hotelName, margin + 22, yPos);
            yPos += 7;
        }

        // Cost for the day
        if (day.cost) {
            checkPageBreak(10);
            doc.setTextColor(22, 163, 74);
            doc.setFont('helvetica', 'bold');
            doc.text(`Est. Cost: $${day.cost.usd} USD (¥${day.cost.rmb})`, margin + 5, yPos);
            yPos += 5;
        }

        yPos += 10;
    });

    // Footer on last page
    checkPageBreak(40);
    yPos = pageHeight - 35;

    doc.setFillColor(...darkColor);
    doc.rect(0, yPos - 5, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Questions? Contact us:', pageWidth / 2, yPos + 5, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text('WeChat: Shahkarhassan', pageWidth / 2, yPos + 15, { align: 'center' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated by ChinaTourPlan • ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 25, { align: 'center' });

    return doc;
}

/**
 * Download the itinerary as PDF
 */
export function downloadItineraryPDF({ itinerary, formData, title }) {
    const doc = generateItineraryPDF({ itinerary, formData, title });
    const fileName = `China-Trip-${formData?.duration || itinerary.length}-Days.pdf`;
    doc.save(fileName);
}

/**
 * Open the PDF in a new tab for printing
 */
export function printItineraryPDF({ itinerary, formData, title }) {
    const doc = generateItineraryPDF({ itinerary, formData, title });
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
}
