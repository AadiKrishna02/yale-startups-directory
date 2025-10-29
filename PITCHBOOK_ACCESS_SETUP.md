# Pitchbook Access Control Setup

## Overview
The pitchbook now has two-tier access control:
1. **Password Access**: Users can enter a password for immediate access
2. **Request-Based Access**: Users can request access, which requires admin approval

## Setup Instructions

### 1. Database Setup
Run the SQL migration to create the access requests table:
```bash
# The migration file is at: supabase/migrations/create_pitchbook_access_requests.sql
# Run it in your Supabase SQL editor or via CLI
```

### 2. Environment Variables
Add the following to your `.env.local`:
```
PITCHBOOK_PASSWORD=your_secure_password_here
NEXT_PUBLIC_BASE_URL=https://yalepitchbook.com
```

### 3. Email Configuration
The system sends emails for:
- Access request notifications (to aadi.krishna@yale.edu)
- Approval notifications (to the requester)

Make sure your `/api/send-email` endpoint is configured with your email provider.

## User Flow

### For Users Requesting Access:
1. Navigate to `/pitchbook`
2. If not authenticated, redirected to `/login`
3. After login, redirected to `/pitchbook-access`
4. Choose either:
   - **Enter password** (if they have it)
   - **Request access** (fill out form with affiliation and reason)
5. If password is correct OR request is approved, they can access `/pitchbook`

### For Admins (Manual Approval Process):
1. Receive email notification when someone requests access
2. Log into Supabase dashboard
3. Query the `pitchbook_access_requests` table
4. To approve a request, use the Supabase SQL editor or create an admin UI:
   ```sql
   UPDATE pitchbook_access_requests
   SET status = 'approved',
       reviewed_at = NOW(),
       reviewed_by = 'aadi.krishna@yale.edu'
   WHERE id = 'REQUEST_ID_HERE';
   ```
5. The system will automatically send an approval email to the user

## API Endpoints

- `POST /api/pitchbook/verify-password` - Verify access password
- `POST /api/pitchbook/request-access` - Submit access request
- `GET /api/pitchbook/check-access` - Check if user has access
- `POST /api/pitchbook/approve-request` - Approve/deny request (can be used for admin UI)

## Database Schema

```sql
pitchbook_access_requests:
- id (UUID, primary key)
- user_email (TEXT)
- user_name (TEXT)
- user_type (TEXT: 'student' or 'investor')
- affiliation (TEXT, nullable)
- reason (TEXT, nullable)
- status (TEXT: 'pending', 'approved', 'denied')
- requested_at (TIMESTAMP)
- reviewed_at (TIMESTAMP, nullable)
- reviewed_by (TEXT, nullable)
```

## Future Enhancements
- Create an admin dashboard UI at `/admin/pitchbook-requests` for easier approval
- Add email templates for better formatting
- Add analytics on who viewed the pitchbook
- Implement expiring access (e.g., 30-day access periods)
