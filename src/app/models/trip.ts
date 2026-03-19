export interface Trip {
  id: string;
  userId: string;
  title: string;
  description: string;
  location: string;
  coverImageUrl: string;

  startDate: Date;
  endDate: Date;

  participants?: string[];

  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type?: 'vacation' | 'business' | 'solo' | 'family';

  statusId?: string;
  typeId?: string;

  budget?: number;
  currency?: string;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;

  isDeleted: boolean;
}
