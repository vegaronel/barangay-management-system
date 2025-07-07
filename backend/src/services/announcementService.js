import { supabase } from '../../config/db.js';

export class AnnouncementService {
  constructor() {
    this.supabase = supabase;
  }

  async createAnnouncement(announcementData) {
    try {
      const { title, content, author_id, priority, expires_at } = announcementData;

      if (!title || !content) {
        throw new Error('Title and content are required');
      }

      const { data, error } = await this.supabase
        .from('announcements')
        .insert([{
          title,
          content,
          author_id: author_id || null,
          priority: priority || 'normal',
          is_published: false,
          expires_at: expires_at || null
        }])
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: 'Announcement created successfully',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async getAllAnnouncements() {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async getPublishedAnnouncements() {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .eq('is_published', true)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Filter out expired announcements
      const currentDate = new Date();
      const activeAnnouncements = data.filter(announcement => {
        if (!announcement.expires_at) return true;
        return new Date(announcement.expires_at) > currentDate;
      });

      return {
        success: true,
        data: activeAnnouncements
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async getAnnouncementById(announcementId) {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .eq('id', announcementId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async updateAnnouncement(announcementId, updates) {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .update(updates)
        .eq('id', announcementId)
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: 'Announcement updated successfully',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async publishAnnouncement(announcementId) {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .update({
          is_published: true,
          published_at: new Date().toISOString()
        })
        .eq('id', announcementId)
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: 'Announcement published successfully',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async unpublishAnnouncement(announcementId) {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .update({
          is_published: false,
          published_at: null
        })
        .eq('id', announcementId)
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: 'Announcement unpublished successfully',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async deleteAnnouncement(announcementId) {
    try {
      const { error } = await this.supabase
        .from('announcements')
        .delete()
        .eq('id', announcementId);

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: 'Announcement deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async getAnnouncementsByPriority(priority) {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .eq('priority', priority)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async getAnnouncementStats() {
    try {
      const { data, error } = await this.supabase
        .from('announcements')
        .select('is_published, priority');

      if (error) {
        throw new Error(error.message);
      }

      const stats = {
        total: data.length,
        published: data.filter(ann => ann.is_published).length,
        draft: data.filter(ann => !ann.is_published).length,
        urgent: data.filter(ann => ann.priority === 'urgent').length,
        high: data.filter(ann => ann.priority === 'high').length,
        normal: data.filter(ann => ann.priority === 'normal').length,
        low: data.filter(ann => ann.priority === 'low').length
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

export default AnnouncementService; 