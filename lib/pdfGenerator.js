import jsPDF from 'jspdf';

/**
 * Generate a professional PDF for the itinerary
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
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let yPos = margin;
    let pageNumber = 1;

    // Colors (RGB values)
    const primaryColor = [230, 0, 18]; // Red
    const darkColor = [30, 41, 59]; // Slate-800
    const grayColor = [100, 116, 139]; // Slate-500
    const lightGray = [241, 245, 249]; // Slate-100
    const greenColor = [22, 163, 74]; // Green-600
    const blueColor = [59, 130, 246]; // Blue-500
    const purpleColor = [147, 51, 234]; // Purple-600
    const amberColor = [217, 119, 6]; // Amber-600

    // Helper function to add page footer
    const addPageFooter = () => {
        doc.setFontSize(8);
        doc.setTextColor(...grayColor);
        doc.text(`ChinaTourPlan.com - Page ${pageNumber}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
    };

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight = 30) => {
        if (yPos + requiredHeight > pageHeight - margin - 15) {
            addPageFooter();
            doc.addPage();
            pageNumber++;
            yPos = margin;
            return true;
        }
        return false;
    };

    // Helper to safely get string value
    const safeString = (val) => {
        if (val === null || val === undefined) return '';
        if (typeof val === 'object') {
            if (val.name) return val.name;
            if (val.english) return val.english;
            return JSON.stringify(val).substring(0, 50);
        }
        return String(val);
    };

    // Helper to get meal string
    const getMealString = (meal) => {
        if (!meal) return '';
        if (typeof meal === 'string') return meal;
        if (typeof meal === 'object') {
            return meal.name || meal.dish || meal.english || '';
        }
        return '';
    };

    // Helper to draw a section header
    const drawSectionHeader = (text, iconColor) => {
        checkPageBreak(12);
        doc.setFillColor(...iconColor);
        doc.circle(margin + 3, yPos + 3, 2, 'F');
        doc.setTextColor(...darkColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(text, margin + 8, yPos + 5);
        yPos += 10;
    };

    // ===== COVER PAGE =====
    // Header Background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 55, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text(title || 'China Travel Itinerary', pageWidth / 2, 28, { align: 'center' });

    // Subtitle - Cities
    const cityNames = [...new Set(itinerary.map(d => d.city))].join(' > ');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(cityNames, pageWidth / 2, 42, { align: 'center' });

    yPos = 70;

    // Trip Summary Box
    const duration = formData?.duration || itinerary.length;
    const totalCostUSD = itinerary.reduce((sum, day) => sum + (day.cost?.usd || 0), 0);
    const totalCostRMB = itinerary.reduce((sum, day) => sum + (day.cost?.rmb || 0), 0);
    const citiesCount = [...new Set(itinerary.map(d => d.city))].length;

    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F');

    doc.setTextColor(...darkColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');

    const colWidth = contentWidth / 4;
    const summaryY = yPos + 10;

    // Duration
    doc.text('DURATION', margin + colWidth / 2, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`${duration} Days`, margin + colWidth / 2, summaryY + 12, { align: 'center' });

    // Cities
    doc.setFontSize(9);
    doc.text('CITIES', margin + colWidth * 1.5, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`${citiesCount}`, margin + colWidth * 1.5, summaryY + 12, { align: 'center' });

    // Pace
    doc.setFontSize(9);
    doc.text('PACE', margin + colWidth * 2.5, summaryY, { align: 'center' });
    doc.setFontSize(16);
    const pace = formData?.pace || 'moderate';
    doc.text(pace.charAt(0).toUpperCase() + pace.slice(1), margin + colWidth * 2.5, summaryY + 12, { align: 'center' });

    // Cost
    doc.setFontSize(9);
    doc.text('EST. COST', margin + colWidth * 3.5, summaryY, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(...greenColor);
    doc.text(`$${totalCostUSD}`, margin + colWidth * 3.5, summaryY + 12, { align: 'center' });

    yPos += 50;

    // ===== DAY BY DAY ITINERARY =====
    itinerary.forEach((day, index) => {
        checkPageBreak(80);

        // Day Header
        doc.setFillColor(...primaryColor);
        doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        const dayTitle = `Day ${day.dayNumber || index + 1}: ${safeString(day.title) || day.city}`;
        doc.text(dayTitle, margin + 5, yPos + 8);

        // City in Chinese if available
        if (day.cityChinese) {
            doc.setFontSize(10);
            doc.text(day.cityChinese, pageWidth - margin - 5, yPos + 8, { align: 'right' });
        }

        yPos += 18;
        doc.setTextColor(...darkColor);

        // Location
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Location:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        const locationText = `${day.city}${day.cityChinese ? ` (${day.cityChinese})` : ''}`;
        doc.text(locationText, margin + 22, yPos);
        yPos += 8;

        // Activities Section
        if (day.activities && day.activities.length > 0) {
            checkPageBreak(25);
            doc.setFont('helvetica', 'bold');
            doc.text('Activities:', margin, yPos);
            yPos += 6;

            day.activities.forEach(activity => {
                checkPageBreak(18);
                const actName = safeString(activity.name || activity);
                const actChinese = activity.nameChinese || '';

                // Activity name with bullet
                doc.setTextColor(...darkColor);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);

                let actText = `* ${actName}`;
                if (actChinese) actText += ` (${actChinese})`;
                doc.text(actText, margin + 3, yPos);
                yPos += 5;

                // Activity description
                if (activity.description) {
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(...grayColor);
                    doc.setFontSize(8);
                    const descLines = doc.splitTextToSize(activity.description, contentWidth - 10);
                    descLines.slice(0, 2).forEach(line => {
                        checkPageBreak(5);
                        doc.text(line, margin + 6, yPos);
                        yPos += 4;
                    });
                }

                // Duration
                if (activity.duration) {
                    doc.setTextColor(...grayColor);
                    doc.text(`Duration: ${activity.duration}`, margin + 6, yPos);
                    yPos += 4;
                }

                // Address
                if (activity.address) {
                    doc.text(`Address: ${activity.address}`, margin + 6, yPos);
                    yPos += 4;
                }

                yPos += 2;
            });
            yPos += 2;
        }

        // Schedule
        if (day.aiSchedule && day.aiSchedule.length > 0) {
            checkPageBreak(20);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Schedule:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            day.aiSchedule.slice(0, 5).forEach(item => {
                checkPageBreak(6);
                const scheduleText = `${item.time || ''} - ${safeString(item.activity)}`;
                doc.setTextColor(...darkColor);
                doc.text(scheduleText, margin + 3, yPos);
                yPos += 4;
            });
            yPos += 3;
        }

        // Food
        if (day.food) {
            checkPageBreak(15);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Food Recommendation:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            const foodName = safeString(day.food.name || day.food);
            doc.text(`* ${foodName}`, margin + 3, yPos);
            yPos += 4;

            if (day.food.description) {
                doc.setTextColor(...grayColor);
                doc.setFontSize(8);
                doc.text(day.food.description.substring(0, 80), margin + 6, yPos);
                yPos += 4;
            }
            yPos += 2;
        }

        // Meals (fixed to handle objects properly)
        if (day.meals) {
            checkPageBreak(15);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Meals:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);

            const breakfast = getMealString(day.meals.breakfast);
            const lunch = getMealString(day.meals.lunch);
            const dinner = getMealString(day.meals.dinner);

            if (breakfast) {
                doc.text(`Breakfast: ${breakfast}`, margin + 3, yPos);
                yPos += 4;
            }
            if (lunch) {
                doc.text(`Lunch: ${lunch}`, margin + 3, yPos);
                yPos += 4;
            }
            if (dinner) {
                doc.text(`Dinner: ${dinner}`, margin + 3, yPos);
                yPos += 4;
            }
            yPos += 2;
        }

        // Hotel
        if (day.hotel) {
            checkPageBreak(18);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Accommodation:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            const hotelName = safeString(day.hotel.name || day.hotel);
            doc.text(`* ${hotelName}`, margin + 3, yPos);
            yPos += 4;

            if (day.hotel.address) {
                doc.setTextColor(...grayColor);
                doc.setFontSize(8);
                doc.text(`Address: ${day.hotel.address}`, margin + 6, yPos);
                yPos += 4;
            }
            if (day.hotel.price) {
                doc.setTextColor(...greenColor);
                doc.text(`Price: ${day.hotel.price}`, margin + 6, yPos);
                yPos += 4;
            }
            yPos += 2;
        }

        // Tips
        if (day.tips && day.tips.length > 0) {
            checkPageBreak(15);
            doc.setTextColor(...darkColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Tips:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...grayColor);
            day.tips.slice(0, 3).forEach(tip => {
                checkPageBreak(5);
                const tipText = typeof tip === 'string' ? tip : `${tip.english || ''}: ${tip.chinese || ''}`;
                const lines = doc.splitTextToSize(`* ${tipText}`, contentWidth - 10);
                lines.slice(0, 1).forEach(line => {
                    doc.text(line, margin + 3, yPos);
                    yPos += 4;
                });
            });
            yPos += 2;
        }

        // Emergency Info
        if (day.emergencyInfo) {
            checkPageBreak(15);
            doc.setTextColor(200, 50, 50);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Emergency:', margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            if (day.emergencyInfo.police) {
                doc.text(`Police: ${day.emergencyInfo.police}`, margin + 3, yPos);
                yPos += 4;
            }
            if (day.emergencyInfo.ambulance) {
                doc.text(`Ambulance: ${day.emergencyInfo.ambulance}`, margin + 3, yPos);
                yPos += 4;
            }
            yPos += 2;
        }

        // Daily Cost
        if (day.cost) {
            checkPageBreak(12);
            doc.setFillColor(240, 253, 244);
            doc.roundedRect(margin, yPos, contentWidth, 10, 2, 2, 'F');
            doc.setTextColor(...greenColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            const costText = `Day ${day.dayNumber || index + 1} Cost: Y${day.cost.rmb} (~$${day.cost.usd} USD)`;
            doc.text(costText, margin + 5, yPos + 7);
            yPos += 15;
        }

        yPos += 8;
    });

    // ===== TOTAL COST SUMMARY =====
    checkPageBreak(40);
    doc.setFillColor(...darkColor);
    doc.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ESTIMATED TOTAL TRIP COST', pageWidth / 2, yPos + 8, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Y${totalCostRMB.toLocaleString()} (~$${totalCostUSD.toLocaleString()} USD)`, pageWidth / 2, yPos + 20, { align: 'center' });

    yPos += 40;

    // ===== TRAVEL ESSENTIALS =====
    checkPageBreak(80);
    doc.setFillColor(...primaryColor);
    doc.roundedRect(margin, yPos, contentWidth, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TRAVEL ESSENTIALS', margin + 5, yPos + 7);
    yPos += 16;

    // Essential Apps
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Must-Have Apps:', margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const apps = [
        'WeChat - Messaging, payments, mini-programs',
        'Alipay - Mobile payments accepted everywhere',
        'VPN - Download BEFORE entering China!',
        'Amap/Gaode - Best navigation in China',
        'Didi - Ride-hailing (China\'s Uber)',
        'Trip.com - Book trains, flights, hotels'
    ];
    apps.forEach(app => {
        checkPageBreak(5);
        doc.setTextColor(...darkColor);
        doc.text(`* ${app}`, margin + 3, yPos);
        yPos += 4;
    });
    yPos += 4;

    // Emergency Numbers
    checkPageBreak(20);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Emergency Numbers:', margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkColor);
    doc.text('* Police: 110', margin + 3, yPos);
    yPos += 4;
    doc.text('* Ambulance: 120', margin + 3, yPos);
    yPos += 4;
    doc.text('* Fire: 119', margin + 3, yPos);
    yPos += 4;
    doc.text('* Tourist Hotline: 12301', margin + 3, yPos);
    yPos += 8;

    // Useful Phrases
    checkPageBreak(25);
    doc.setTextColor(...blueColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Essential Phrases:', margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const phrases = [
        'Hello - Ni hao',
        'Thank you - Xie xie',
        'How much? - Duo shao qian?',
        'Where is...? - ...zai na li?',
        'I need help - Wo xu yao bang zhu'
    ];
    phrases.forEach(phrase => {
        checkPageBreak(5);
        doc.setTextColor(...darkColor);
        doc.text(`* ${phrase}`, margin + 3, yPos);
        yPos += 4;
    });
    yPos += 8;

    // ===== FOOTER =====
    checkPageBreak(30);
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F');

    doc.setTextColor(...darkColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Need Help? Contact Us', pageWidth / 2, yPos + 8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('WeChat: Shahkarhassan | WhatsApp Available', pageWidth / 2, yPos + 15, { align: 'center' });

    doc.setTextColor(...grayColor);
    doc.setFontSize(8);
    doc.text(`Generated by ChinaTourPlan - ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 21, { align: 'center' });

    // Add page footer to last page
    addPageFooter();

    return doc;
}

/**
 * Download the itinerary as PDF
 */
export function downloadItineraryPDF({ itinerary, formData, title }) {
    const doc = generateItineraryPDF({ itinerary, formData, title });
    const cityNames = [...new Set(itinerary.map(d => d.city))].join('-');
    const fileName = `China-Trip-${formData?.duration || itinerary.length}-Days-${cityNames}.pdf`;
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
