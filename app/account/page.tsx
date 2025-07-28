'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface Startup {
  name?: string; 
  description?: string;
  industry?: string;
  founders?: string;
  stage?: string;
  team?: string;
  website?: string;
  problem?: string; 
  display_founders?: boolean; // NEW FIELD
  [key: string]: string | boolean | undefined;
}

function EditableStartupCard({
  startup,
  onUpdate,
}: {
  startup: Startup;
  onUpdate: (updatedStartup: Startup) => void;
}) {
  // Keep track of the original name for .eq() in the update
  const [originalName, setOriginalName] = useState(startup.name);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Startup>({ ...startup });
  const [saving, setSaving] = useState(false);

  // Generic handleChange for text fields, textareas, and selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    // If it's a checkbox, use `checked`; otherwise use `value`
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update row with all the form data, matching on the original name
      const { data, error } = await supabase
        .from('startups')
        .update({
          name: formData.name,
          description: formData.description,
          founders: formData.founders,
          industry: formData.industry,
          stage: formData.stage,
          team: formData.team,
          website: formData.website,
          problem: formData.problem,
          display_founders: formData.display_founders, // <-- Include the new field
        })
        .eq('name', originalName)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      if (data && data.length > 0) {
        const updatedRow = data[0];
        onUpdate(updatedRow);
        // Update the original name in case the user changed it
        setOriginalName(updatedRow.name);
      } else {
        console.warn('No updated row returned');
      }
      setEditMode(false);
    } catch (error) {
      console.error('Error updating startup:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...startup });
    setEditMode(false);
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        {editMode ? 'Edit Your Startup' : startup.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Startup Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${
              editMode
                ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                : 'bg-gray-50 border-gray-200'
            }`}
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${
              editMode
                ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                : 'bg-gray-50 border-gray-200'
            }`}
            placeholder="e.g., https://yourstartup.com"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          readOnly={!editMode}
          rows={3}
          className={`w-full p-2 border rounded ${
            editMode
              ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
              : 'bg-gray-50 border-gray-200'
          }`}
          placeholder="Brief description of your startup"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">
            Founders (comma-separated)
          </label>
          <input
            type="text"
            name="founders"
            value={formData.founders || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${
              editMode
                ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                : 'bg-gray-50 border-gray-200'
            }`}
            placeholder="e.g., Jane Doe, John Smith"
          />
          {editMode && (
            <p className="text-xs text-gray-500 mt-1">
              List founder names exactly as they appear in Yale CAS 
              to allow them to edit this listing
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">
            Industry (comma-separated)
          </label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${
              editMode
                ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                : 'bg-gray-50 border-gray-200'
            }`}
            placeholder="e.g., Fintech, Education, Healthcare"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="display_founders"
          checked={!!formData.display_founders}
          onChange={handleChange}
          disabled={!editMode}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-gray-700">
          Show Founders in Directory
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Stage</label>
          {editMode ? (
            <select
              name="stage"
              value={formData.stage || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            >
              <option value="">Select Stage</option>
              <option value="Idea">Idea</option>
              <option value="Proof of Concept">Proof of Concept</option>
              <option value="Building">Building</option>
              <option value="Testing">Testing</option>
              <option value="Launched: Pre-revenue">Launched: Pre-revenue</option>
              <option value="Launched: Revenue">Launched: Revenue</option>
              <option value="Launched: Growth">Launched: Growth</option>
            </select>
          ) : (
            <input
              type="text"
              value={formData.stage || ''}
              readOnly
              className="w-full p-2 border rounded bg-gray-50 border-gray-200"
            />
          )}
        </div>

        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">
            Yale Affiliation
          </label>
          {editMode ? (
            <select
              name="team"
              value={formData.team || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            >
              <option value="">Select Affiliation</option>
              <option value="Yale College">Yale College</option>
              <option value="Yale SOM">Yale SOM</option>
              <option value="Yale School of Arts & Sciences">
                Yale School of Arts & Sciences
              </option>
              <option value="Yale School of Engineering">
                Yale School of Engineering
              </option>
              <option value="Yale School of Public Health">
                Yale School of Public Health
              </option>
              <option value="Yale Law School">Yale Law School</option>
              <option value="Yale School of Environment">
                Yale School of Environment
              </option>
              <option value="Yale School of Medicine">
                Yale School of Medicine
              </option>
              <option value="Yale Alumni">Yale Alumni</option>
              <option value="Yale Faculty">Yale Faculty</option>
            </select>
          ) : (
            <input
              type="text"
              value={formData.team || ''}
              readOnly
              className="w-full p-2 border rounded bg-gray-50 border-gray-200"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="block font-medium text-gray-700">
            Opportunities
            {editMode && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Looking for talent? Post an announcement here)
              </span>
            )}
          </label>

          {!editMode && formData.problem && (
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
              Active Opportunity
            </span>
          )}
        </div>

        {!editMode && formData.problem ? (
          <div className="p-4 border border-gray-200 rounded bg-gray-50">
            <div className="prose prose-sm text-gray-700 whitespace-pre-line">
              {formData.problem}
            </div>
          </div>
        ) : (
          <textarea
            name="problem"
            value={formData.problem || ''}
            onChange={handleChange}
            readOnly={!editMode}
            rows={4}
            className={`w-full p-2 border rounded ${
              editMode
                ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                : 'bg-gray-50 border-gray-200'
            }`}
            placeholder={
              editMode
                ? 'Example: Looking for a technical co-founder with experience in React and machine learning...'
                : 'Looking for talent? Post an announcement here.'
            }
          />
        )}

        {editMode && (
          <p className="text-xs text-gray-500 mt-1">
            Your announcement will be visible on the Opportunities page and may
            be seen by students/talent looking to join startups.
          </p>
        )}
      </div>

      <div className="flex space-x-3 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Edit Startup
          </button>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [userStartups, setUserStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [affiliations, setAffiliations] = useState('');
  const [loadingAff, setLoadingAff] = useState(true);
  const [savingAff, setSavingAff] = useState(false);
  const [investorAffiliation, setInvestorAffiliation] = useState('');
  const [loadingInvestorAff, setLoadingInvestorAff] = useState(true);
  const [savingInvestorAff, setSavingInvestorAff] = useState(false);

  useEffect(() => {
    async function loadUserStartups() {
      if (!user || user.type !== 'student') {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('startups').select('*');
        if (error) {
          throw error;
        }

        // Normalize the user's full name by removing spaces/lowercasing
        const normalizedUserName = user.name.replace(/\s+/g, '').toLowerCase();

        // Filter to find startups that list this user as a founder
        const filtered = (data as Startup[]).filter((startup) => {
          if (!startup.founders) return false;
          const foundersList = startup.founders
            .split(',')
            .map((f) => f.replace(/\s+/g, '').toLowerCase());
          return foundersList.includes(normalizedUserName);
        });

        setUserStartups(filtered);
      } catch (error) {
        console.error('Error loading startups for account:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUserStartups();
  }, [user]);

  useEffect(() => {
    async function loadAffiliations() {
      if (!user || user.type !== 'student') {
        setLoadingAff(false);
        return;
      }
      const { data, error } = await supabase
        .from('students')
        .select('affiliations')
        .eq('netid', user.netid!)
        .single();
      if (!error && data) {
        setAffiliations(data.affiliations || '');
      }
      setLoadingAff(false);
    }
    loadAffiliations();
  }, [user]);

  useEffect(() => {
    async function loadInvestorAffiliation() {
      if (!user || user.type !== 'investor') {
        setLoadingInvestorAff(false);
        return;
      }
      const { data, error } = await supabase
        .from('investors')
        .select('affiliation')
        .eq('email', user.email!)
        .single();
      if (!error && data) {
        setInvestorAffiliation(data.affiliation || '');
      }
      setLoadingInvestorAff(false);
    }
    loadInvestorAffiliation();
  }, [user]);

  const handleSaveAffiliations = async () => {
    if (!user) return;
    setSavingAff(true);
    await supabase
      .from('students')
      .update({ affiliations })
      .eq('netid', user.netid!);
    setSavingAff(false);
  };

  const handleSaveInvestorAffiliation = async () => {
    if (!user) return;
    setSavingInvestorAff(true);
    await supabase
      .from('investors')
      .update({ affiliation: investorAffiliation })
      .eq('email', user.email!);
    setSavingInvestorAff(false);
  };

  const handleUpdateStartup = (updatedStartup: Startup) => {
    setUserStartups((prev) =>
      prev.map((s) => (s.name === updatedStartup.name ? updatedStartup : s))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div>
              {user && (
                <p className="text-xl font-medium text-blue-700">Hi, {user.name}!</p>
              )}
              <h1 className="text-3xl font-bold text-blue-900">
                {user?.type === 'investor' ? 'Investor Account' : 'Your Startup Dashboard'}
              </h1>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          {user?.type === 'investor' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <label className="block text-sm font-medium mb-1">Affiliation</label>
              {loadingInvestorAff ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : (
                <>
                  <input
                    type="text"
                    value={investorAffiliation}
                    onChange={(e) => setInvestorAffiliation(e.target.value)}
                    placeholder="please input your investor affiliation"
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                  <button
                    onClick={handleSaveInvestorAffiliation}
                    disabled={savingInvestorAff}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {savingInvestorAff ? 'Saving...' : 'Save'}
                  </button>
                </>
              )}
            </div>
          )}

          {user?.type === 'student' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <label className="block text-sm font-medium mb-1">
                If you are an investor or work with any fund, please list your affiliations
              </label>
              {loadingAff ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : (
                <>
                  <input
                    type="text"
                    value={affiliations}
                    onChange={(e) => setAffiliations(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                  <button
                    onClick={handleSaveAffiliations}
                    disabled={savingAff}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {savingAff ? 'Saving...' : 'Save'}
                  </button>
                </>
              )}
            </div>
          )}

          {user?.type === 'student' && (
            loading ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-lg text-gray-600">Loading your startups...</p>
              </div>
            ) : (
              <>
                {userStartups.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <p className="text-lg text-gray-600 mb-4">
                      You are not listed as a founder for any startups.
                    </p>
                    <p className="text-gray-500">
                      If your startup should be listed here, please make sure your
                      name is included in the founders list exactly as it appears
                      in your Yale account.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {userStartups.map((startup, index) => (
                      <EditableStartupCard
                        key={startup.name || index}
                        startup={startup}
                        onUpdate={handleUpdateStartup}
                      />
                    ))}
                  </div>
                )}
              </>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
