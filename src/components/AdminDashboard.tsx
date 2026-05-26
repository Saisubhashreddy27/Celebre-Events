import React, { useEffect, useState } from 'react';
import { User, CelebrationEvent } from '../types';
import { Shield, Users, Calendar, CheckCircle, Clock } from 'lucide-react';

interface AdminDashboardProps {
  adminUser: User;
}

export default function AdminDashboard({ adminUser }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<CelebrationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [usersRes, eventsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/events')
      ]);

      if (!usersRes.ok || !eventsRes.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const usersData = await usersRes.json();
      const eventsData = await eventsRes.json();

      setUsers(usersData);
      setEvents(eventsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (eventId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const { event } = await res.json();
        setEvents(events.map(e => (e.id === event.id ? event : e)));
      } else {
        alert('Failed to update event status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gold">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="w-8 h-8 text-gold" />
        <h1 className="text-3xl font-serif font-bold text-navy-deep">Admin Control Center</h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* STATS */}
        <div className="bg-white p-6 rounded-[16px] shadow-sm border border-gold/15 flex items-center space-x-4">
          <div className="p-3 bg-gold/10 rounded-full">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-sm text-charcoal/60 uppercase tracking-widest font-semibold">Total Users</p>
            <p className="text-3xl font-bold text-navy-deep">{users.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[16px] shadow-sm border border-gold/15 flex items-center space-x-4">
          <div className="p-3 bg-gold/10 rounded-full">
            <Calendar className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-sm text-charcoal/60 uppercase tracking-widest font-semibold">Total Events</p>
            <p className="text-3xl font-bold text-navy-deep">{events.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* USERS TABLE */}
        <section>
          <h2 className="text-xl font-bold text-navy-deep mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-gold" />
            <span>Registered Users</span>
          </h2>
          <div className="bg-white rounded-[16px] shadow-sm border border-gold/15 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gold/5 text-charcoal/70 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-gold/10">ID</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Name</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Email</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Country</th>
                </tr>
              </thead>
              <tbody className="text-sm text-charcoal">
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{u.id}</td>
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.country}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-charcoal/50">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* EVENTS TABLE */}
        <section>
          <h2 className="text-xl font-bold text-navy-deep mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gold" />
            <span>Platform Events</span>
          </h2>
          <div className="bg-white rounded-[16px] shadow-sm border border-gold/15 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gold/5 text-charcoal/70 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-gold/10">Event ID</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Planner</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Recipient</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Date</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Package</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Status</th>
                  <th className="p-4 font-semibold border-b border-gold/10">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-charcoal">
                {events.map(e => (
                  <tr key={e.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{e.id}</td>
                    <td className="p-4 font-medium">{e.plannerEmail}</td>
                    <td className="p-4">{e.recipient.name}</td>
                    <td className="p-4">{e.date || 'TBD'}</td>
                    <td className="p-4">
                      <span className="bg-gold/10 text-gold-dark px-2 py-1 rounded text-xs font-bold tracking-wider">
                        {e.packageType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold tracking-wider flex items-center w-max space-x-1 ${
                        e.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        e.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {e.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        <span>{e.status}</span>
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <select 
                        value={e.status} 
                        onChange={(ev) => handleUpdateStatus(e.id, ev.target.value)}
                        className="bg-white border border-gold/30 rounded px-2 py-1 text-xs outline-hidden"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-charcoal/50">No events found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
