-- Create investor password reset tokens table
CREATE TABLE IF NOT EXISTS investor_password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for token lookups
CREATE INDEX IF NOT EXISTS idx_investor_reset_token ON investor_password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_investor_reset_email ON investor_password_reset_tokens(investor_email);

-- Enable Row Level Security
ALTER TABLE investor_password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Policy for service role access
CREATE POLICY "Service role has full access" ON investor_password_reset_tokens
  FOR ALL
  USING (auth.role() = 'service_role');
