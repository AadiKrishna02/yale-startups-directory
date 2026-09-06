'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  STAGES,
  SECTORS,
  FUNDING_RAISED,
  FUNDING_TIMELINE,
  YALE_AFFILIATIONS,
  PITCHBOOK_OPT_IN,
  EMPTY_SUBMISSION,
  StartupSubmission,
} from '@/lib/startupForm';

const OTHER = 'Other';

// The Google Form's multiple-choice questions each ended in an "Other:" escape
// hatch. Reproducing that means tracking the radio choice separately from the
// free-text value, then sending whichever one applies.
type ChoiceField = 'stage' | 'industry' | 'funding_raised' | 'funding_timeline';

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

function Question({
  label,
  help,
  required,
  children,
}: {
  label: string;
  help?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {help && <p className="text-xs text-gray-500">{help}</p>}
      {children}
    </div>
  );
}

export default function SubmitStartupPage() {
  const [form, setForm] = useState<StartupSubmission>(EMPTY_SUBMISSION);
  const [choices, setChoices] = useState<Record<ChoiceField, string>>({
    stage: '',
    industry: '',
    funding_raised: '',
    funding_timeline: '',
  });
  const [otherText, setOtherText] = useState<Record<ChoiceField, string>>({
    stage: '',
    industry: '',
    funding_raised: '',
    funding_timeline: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const setField = (key: keyof StartupSubmission, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const selectChoice = (field: ChoiceField, option: string) => {
    setChoices((prev) => ({ ...prev, [field]: option }));
    setField(field, option === OTHER ? otherText[field] : option);
  };

  const setOther = (field: ChoiceField, value: string) => {
    setOtherText((prev) => ({ ...prev, [field]: value }));
    if (choices[field] === OTHER) setField(field, value);
  };

  const radioGroup = (field: ChoiceField, options: readonly string[]) => (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="radio"
            name={field}
            checked={choices[field] === option}
            onChange={() => selectChoice(field, option)}
            className="mt-0.5"
            required
          />
          <span>{option}</span>
        </label>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name={field}
          checked={choices[field] === OTHER}
          onChange={() => selectChoice(field, OTHER)}
        />
        <span className="text-sm text-gray-700">Other:</span>
        <input
          type="text"
          value={otherText[field]}
          onChange={(e) => setOther(field, e.target.value)}
          onFocus={() => selectChoice(field, OTHER)}
          className="flex-1 border-b border-gray-300 px-1 py-0.5 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/startups/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 py-12">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            <h1 className="text-xl font-bold text-gray-900">Thanks for your submission!</h1>
            <p className="text-sm text-gray-600">
              We&apos;ve received your startup and our team will review it shortly. Once
              approved, it will appear in the Yale Startup Directory.
            </p>
            <Link
              href="/directory"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm font-medium transition-colors"
            >
              Browse the Directory
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <main className="flex-grow p-4 py-12">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 border-t-8 border-t-blue-600">
            <h1 className="text-2xl font-bold text-gray-900">Submit Your Startup</h1>
            <p className="mt-2 text-sm text-gray-600">
              Tell us about your venture to be listed in the Yale Startup Directory.
              Questions marked <span className="text-red-600">*</span> are required.
              Fields marked <strong>(Public)</strong> will be shown on your directory
              listing; everything else is used only by our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <Question label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={inputClass}
                  required
                  placeholder="you@yale.edu"
                />
              </Question>

              <Question label="Startup Name (Public)" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  className={inputClass}
                  required
                />
              </Question>

              <Question label="Stage of development (Public)" required>
                {radioGroup('stage', STAGES)}
              </Question>

              <Question label="Sector (Public)" required>
                {radioGroup('industry', SECTORS)}
              </Question>

              <Question label="One line description (Public)" required>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  className={inputClass}
                  required
                />
              </Question>

              <Question label="Problem statement (2-3 sentences)" required>
                <textarea
                  value={form.problem}
                  onChange={(e) => setField('problem', e.target.value)}
                  className={`${inputClass} min-h-[100px]`}
                  required
                />
              </Question>

              <Question label="Proposed solution (3-4 sentences)" required>
                <textarea
                  value={form.solution}
                  onChange={(e) => setField('solution', e.target.value)}
                  className={`${inputClass} min-h-[100px]`}
                  required
                />
              </Question>

              <Question label="Link to the website (Public)">
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => setField('website', e.target.value)}
                  className={inputClass}
                  placeholder="yourstartup.com"
                />
              </Question>

              <Question
                label="Yale affiliation (Public)"
                help="Used to filter the directory by school. Pick the affiliation that best describes your founding team."
                required
              >
                <select
                  value={form.team}
                  onChange={(e) => setField('team', e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select an affiliation</option>
                  {YALE_AFFILIATIONS.map((affiliation) => (
                    <option key={affiliation} value={affiliation}>
                      {affiliation}
                    </option>
                  ))}
                </select>
              </Question>

              <Question
                label="List of the founders, LinkedIn, and Yale affiliation"
                help="Only shown publicly if you check the box below."
                required
              >
                <textarea
                  value={form.founders}
                  onChange={(e) => setField('founders', e.target.value)}
                  className={`${inputClass} min-h-[100px]`}
                  required
                />
                <label className="flex items-start gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.display_founders}
                    onChange={(e) => setField('display_founders', e.target.checked)}
                    className="mt-1"
                  />
                  <span>Show this founder list publicly on our directory listing.</span>
                </label>
              </Question>

              <Question
                label="Contact person for more information: Name, Role, Preferred Contact"
                required
              >
                <textarea
                  value={form.contact_person}
                  onChange={(e) => setField('contact_person', e.target.value)}
                  className={`${inputClass} min-h-[80px]`}
                  required
                />
              </Question>

              <Question label="Has your startup raised any money so far?" required>
                {radioGroup('funding_raised', FUNDING_RAISED)}
              </Question>

              <Question label="When are you looking for funding?" required>
                {radioGroup('funding_timeline', FUNDING_TIMELINE)}
              </Question>

              <Question label="Would you like to be a part of the Startup Pitchbook?" required>
                <div className="space-y-2">
                  {PITCHBOOK_OPT_IN.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="pitchbook_opt_in"
                        checked={form.pitchbook_opt_in === option}
                        onChange={() => setField('pitchbook_opt_in', option)}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </Question>
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg px-4 py-3 font-medium transition-colors"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
