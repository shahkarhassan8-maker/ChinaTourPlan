import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Users, Crown, MapPin, Calendar,
  Shield, Eye, ChevronDown, ChevronUp, Mail,
  Sparkles, TrendingUp, Clock, Search
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { ADMIN_EMAILS, isAdmin, getPlanDisplayName } from '@/lib/accessControl';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [users, setUsers] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [stats, setStats] = useState({ free: 0, pro: 0, elite: 0, lifetime: 0, total: 0 });
  const [activeTab, setActiveTab] = useState('users');
  const [expandedItinerary, setExpandedItinerary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/signup');
        return;
      }

      const userData = JSON.parse(storedUser);
      const userEmail = userData.email?.toLowerCase();

      if (!ADMIN_EMAILS.includes(userEmail)) {
        toast.error('Access denied. Admin only.');
        router.push('/dashboard');
        return;
      }

      setIsAuthorized(true);
      await loadAdminData();
    } catch (error) {
      console.error('Admin check error:', error);
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      if (!supabase) {
        toast.error('Database not configured');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error('Session expired. Please sign in again.');
        router.push('/signup');
        return;
      }

      const response = await fetch('/api/admin/data', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          toast.error('Access denied. Admin only.');
          router.push('/dashboard');
          return;
        }
        throw new Error('Failed to fetch admin data');
      }

      const data = await response.json();
      setUsers(data.users);
      setItineraries(data.itineraries);
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItineraries = itineraries.filter(it =>
    it.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'elite':
      case 'lifetime':
        return 'bg-amber-100 text-amber-800';
      case 'pro':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Head>
        <title>Admin Dashboard | ChinaTourPlan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white"
          >
            <Users className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-blue-200 text-sm">Total Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl p-5 text-white"
          >
            <Sparkles className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{stats.free}</p>
            <p className="text-slate-300 text-sm">Free Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 text-white"
          >
            <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{stats.pro}</p>
            <p className="text-green-200 text-sm">Pro Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white"
          >
            <Crown className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{stats.elite + stats.lifetime}</p>
            <p className="text-amber-100 text-sm">Elite Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white"
          >
            <MapPin className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{itineraries.length}</p>
            <p className="text-purple-200 text-sm">Total Itineraries</p>
          </motion.div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'itineraries'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Itineraries ({itineraries.length})
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search users or itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Plan</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Joined</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Itineraries</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => {
                    const userItineraries = itineraries.filter(it => it.user_id === user.id);
                    return (
                      <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="text-white font-medium">{user.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300">{user.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                            {getPlanDisplayName(user.plan)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-400 text-sm">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300">{userItineraries.length}</span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'itineraries' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredItineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-slate-800/80 transition-colors"
                  onClick={() => setExpandedItinerary(expandedItinerary === itinerary.id ? null : itinerary.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{itinerary.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPlanColor(itinerary.profiles?.plan)}`}>
                          {getPlanDisplayName(itinerary.profiles?.plan)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {itinerary.profiles?.name || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {itinerary.profiles?.email || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {itinerary.duration} days
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {itinerary.cities?.join(', ') || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/itinerary/${itinerary.id}`} target="_blank">
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      {expandedItinerary === itinerary.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedItinerary === itinerary.id && (
                  <div className="px-6 pb-6 border-t border-slate-700">
                    <div className="pt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Created</p>
                        <p className="text-slate-300">
                          {itinerary.created_at ? new Date(itinerary.created_at).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Pace</p>
                        <p className="text-slate-300 capitalize">{itinerary.pace || 'N/A'}</p>
                      </div>
                      {itinerary.selected_places && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-slate-500 mb-1">Selected Places</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(itinerary.selected_places || {}).map(([city, places]) => (
                              <span key={city} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                                {city}: {Array.isArray(places) ? places.length : 0} places
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredItineraries.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No itineraries found
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
