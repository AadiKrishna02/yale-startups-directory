-- Create pitchbook_access_requests table
CREATE TABLE IF NOT EXISTS pitchbook_access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'investor')),
  affiliation TEXT,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_pitchbook_access_user_email ON pitchbook_access_requests(user_email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_pitchbook_access_status ON pitchbook_access_requests(status);

-- Enable Row Level Security
ALTER TABLE pitchbook_access_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access" ON pitchbook_access_requests
  FOR ALL
  USING (auth.role() = 'service_role');
