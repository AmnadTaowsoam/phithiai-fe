'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, X, Check, XCircle, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type AvailabilitySlot = {
  id: string;
  date: string;
  time: string;
  status: 'available' | 'booked' | 'blocked' | 'tentative';
  bookingId?: string;
  notes?: string;
};

export type DayAvailability = {
  date: string;
  day: number;
  month: number;
  year: number;
  slots: AvailabilitySlot[];
};

type Props = {
  availability: DayAvailability[];
  onSlotClick?: (slot: AvailabilitySlot) => void;
  onSlotUpdate?: (slotId: string, status: AvailabilitySlot['status']) => void;
  onSlotAdd?: (date: string, time: string) => void;
  onSlotDelete?: (slotId: string) => void;
};

const statusConfig = {
  available: {
    label: 'Available',
    color: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30',
    icon: Check,
  },
  booked: {
    label: 'Booked',
    color: 'bg-brand-500/10 text-brand-200 border-brand-500/30',
    icon: Clock,
  },
  blocked: {
    label: 'Blocked',
    color: 'bg-red-500/10 text-red-200 border-red-500/30',
    icon: XCircle,
  },
  tentative: {
    label: 'Tentative',
    color: 'bg-amber-500/10 text-amber-200 border-amber-500/30',
    icon: Clock,
  },
};

export const CalendarView = ({ availability, onSlotClick, onSlotUpdate, onSlotAdd, onSlotDelete }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddSlot, setShowAddSlot] = useState(false);

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return { days, month, year, daysInMonth };
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: number) => {
    if (!day) return;
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const { days, month, year } = getMonthData(currentDate);

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-ivory">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToToday}
              className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
            >
              Today
            </button>
          </div>

          <button
            onClick={goToNextMonth}
            className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <Button
          onClick={() => setShowAddSlot(!showAddSlot)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Availability
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-ivory/60">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day, index) => {
          if (!day) return <div key={index} className="h-24" />;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayAvailability = availability.find(a => a.date === dateStr);
          const isSelected = selectedDate?.getTime() === new Date(year, month, day).getTime();
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`relative h-24 cursor-pointer rounded-lg border transition-all hover:border-ivory/30 ${
                isSelected
                  ? 'border-brand-500/40 bg-brand-500/10'
                  : isToday
                  ? 'border-ivory/20 bg-ivory/10'
                  : 'border-ivory/10 bg-background/60'
              }`}
            >
              {/* Day Number */}
              <div className={`text-sm font-medium ${isSelected ? 'text-brand-200' : 'text-ivory'}`}>
                {day}
              </div>

              {/* Availability Indicators */}
              {dayAvailability?.slots && dayAvailability.slots.length > 0 && (
                <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
                  {dayAvailability.slots.slice(0, 3).map((slot, slotIndex) => {
                    const config = statusConfig[slot.status];
                    const StatusIcon = config.icon;
                    return (
                      <div
                        key={slot.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSlotClick?.(slot);
                        }}
                        className={`flex h-4 w-4 items-center justify-center rounded border ${config.color} hover:opacity-80`}
                        title={`${config.label} at ${slot.time}`}
                      >
                        <StatusIcon className="h-2.5 w-2.5" />
                      </div>
                    );
                  })}
                  {dayAvailability.slots.length > 3 && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-ivory/15 bg-background/70 text-xs text-ivory/60">
                      +{dayAvailability.slots.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <div className="mt-6 rounded-lg border border-ivory/10 bg-background/60 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ivory">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <CalendarIcon className="h-4 w-4 text-ivory/60" />
                <span className="text-sm text-ivory/60">
                  {dayNames[selectedDate.getDay()]}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Slots for Selected Day */}
          {(() => {
            const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            const dayAvailability = availability.find(a => a.date === dateStr);

            if (!dayAvailability || dayAvailability.slots.length === 0) {
              return (
                <div className="text-center py-8">
                  <p className="text-ivory/60">No availability slots for this day</p>
                  <Button
                    onClick={() => onSlotAdd?.(dateStr, '09:00')}
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Slot
                  </Button>
                </div>
              );
            }

            return (
              <div className="space-y-2">
                {dayAvailability.slots.map((slot) => {
                  const config = statusConfig[slot.status];
                  const StatusIcon = config.icon;

                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between rounded-lg border border-ivory/10 bg-background/60 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${config.color}`}>
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-ivory">{slot.time}</span>
                            <Badge className={`border ${config.color}`}>
                              {config.label}
                            </Badge>
                          </div>
                          {slot.bookingId && (
                            <span className="text-xs text-ivory/60">Booking: {slot.bookingId}</span>
                          )}
                        </div>
                        {slot.notes && (
                          <p className="mt-1 text-xs text-ivory/60">{slot.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {onSlotUpdate && slot.status !== 'booked' && (
                          <select
                            value={slot.status}
                            onChange={(e) => onSlotUpdate(slot.id, e.target.value as AvailabilitySlot['status'])}
                            className="rounded-lg border border-ivory/15 bg-background/70 px-2 py-1.5 text-xs text-ivory focus:border-brand-500/40 focus:outline-none"
                          >
                            <option value="available">Available</option>
                            <option value="blocked">Blocked</option>
                            <option value="tentative">Tentative</option>
                          </select>
                        )}
                        {onSlotDelete && (
                          <button
                            onClick={() => onSlotDelete(slot.id)}
                            className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-200 hover:bg-red-500/15"
                            title="Delete slot"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-ivory/10 bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ivory">Add Availability Slot</h3>
              <button
                onClick={() => setShowAddSlot(false)}
                className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Date</label>
                <input
                  type="date"
                  defaultValue={currentDate.toISOString().split('T')[0]}
                  className="w-full rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Time</label>
                <select className="w-full rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm text-ivory focus:border-brand-500/40 focus:outline-none">
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Status</label>
                <select className="w-full rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm text-ivory focus:border-brand-500/40 focus:outline-none">
                  <option value="available">Available</option>
                  <option value="blocked">Blocked</option>
                  <option value="tentative">Tentative</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add any notes about this slot..."
                  className="w-full rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-brand-500/40 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setShowAddSlot(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  const date = currentDate.toISOString().split('T')[0];
                  onSlotAdd?.(date, '09:00');
                  setShowAddSlot(false);
                }}>
                  Add Slot
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
