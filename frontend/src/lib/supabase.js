import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('Supabase URL:', supabaseUrl ? 'configured' : 'MISSING');
console.log('Supabase Key:', supabaseAnonKey ? 'configured' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Supabase credentials not configured!');
    console.error('Create frontend/.env file with:');
    console.error('VITE_SUPABASE_URL=https://yourproject.supabase.co');
    console.error('VITE_SUPABASE_ANON_KEY=your_anon_key');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

export const STORAGE_BUCKET = 'media';

export const uploadFile = async (file, userId) => {
    // Validate credentials first
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase not configured. Check console for setup instructions.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    console.log('Uploading to bucket:', STORAGE_BUCKET);
    console.log('File path:', fileName);

    const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    console.log('Upload successful:', data);

    const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl);

    return {
        path: data.path,
        publicUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
    };
};

export const deleteFile = async (filePath) => {
    const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

    if (error) throw error;
    return true;
};

export const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'pdf';
    return 'document';
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
