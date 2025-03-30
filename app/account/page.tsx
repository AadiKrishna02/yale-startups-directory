// 'use client';
// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { useAuth } from '@/context/AuthContext';
// import { supabase } from '@/lib/supabaseClient';

// interface Startup {
//   name?: string; // primary key
//   description?: string;
//   industry?: string;
//   founders?: string;
//   stage?: string;
//   team?: string;
//   website?: string;
//   [key: string]: string | undefined;
// }

// function EditableStartupCard({
//   startup,
//   onUpdate,
// }: {
//   startup: Startup;
//   onUpdate: (updatedStartup: Startup) => void;
// }) {
//   // Save the original name so we can identify the record even if the name is changed
//   const [originalName, setOriginalName] = useState(startup.name);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState<Startup>({ ...startup });
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     console.log('Attempting update for record with name:', originalName);
//     try {
//       // Use originalName to find the row
//       const { data, error } = await supabase
//         .from('startups')
//         .update({
//           name: formData.name,
//           description: formData.description,
//           founders: formData.founders,
//           industry: formData.industry,
//           stage: formData.stage,
//           team: formData.team,
//           website: formData.website,
//         })
//         .eq('name', originalName)
//         .select();

//       if (error) {
//         console.error('Supabase update error:', error);
//         throw error;
//       }
//       console.log('Update response data:', data);
//       if (data && data.length > 0) {
//         const updatedRow = data[0];
//         onUpdate(updatedRow);
//         // Update the originalName in case the name was changed
//         setOriginalName(updatedRow.name);
//       } else {
//         console.warn('No updated row returned');
//       }
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating startup:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ ...startup });
//     setEditMode(false);
//   };

//   return (
//     <div className="p-4 border rounded shadow-sm bg-white">
//       <div className="mb-2">
//         <label className="block font-medium">Startup Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name || ''}
//           onChange={handleChange}
//           readOnly={!editMode}
//           className={`w-full p-2 border rounded ${editMode ? 'bg-white' : 'bg-gray-100'}`}
//         />
//       </div>
//       <div className="mb-2">
//         <label className="block font-medium">Description</label>
//         <textarea
//           name="description"
//           value={formData.description || ''}
//           onChange={handleChange}
//           readOnly={!editMode}
//           className={`w-full p-2 border rounded ${editMode ? 'bg-white' : 'bg-gray-100'}`}
//         />
//       </div>
//       <div className="mb-2">
//         <label className="block font-medium">Founders</label>
//         <input
//           type="text"
//           name="founders"
//           value={formData.founders || ''}
//           onChange={handleChange}
//           readOnly={!editMode}
//           className={`w-full p-2 border rounded ${editMode ? 'bg-white' : 'bg-gray-100'}`}
//         />
//       </div>
//       {/* Add additional fields as needed */}
//       <div className="flex space-x-2 mt-4">
//         {editMode ? (
//           <>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             >
//               {saving ? 'Saving...' : 'Save'}
//             </button>
//             <button
//               onClick={handleCancel}
//               disabled={saving}
//               className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setEditMode(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function AccountPage() {
//   const { user, logout } = useAuth();
//   const [userStartups, setUserStartups] = useState<Startup[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadUserStartups() {
//       if (!user) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const { data, error } = await supabase.from('startups').select('*');
//         if (error) {
//           throw error;
//         }
//         console.log('Fetched startups:', data);
//         // Normalize the user's full name by removing spaces and lowercasing
//         const normalizedUserName = user.name.replace(/\s+/g, '').toLowerCase();
//         // Filter startups where the "founders" column (normalized) includes the user's full name.
//         const filtered = data.filter((startup: Startup) => {
//           if (!startup.founders) return false;
//           const foundersList = startup.founders.split(',').map((f) =>
//             f.replace(/\s+/g, '').toLowerCase()
//           );
//           return foundersList.includes(normalizedUserName);
//         });
//         setUserStartups(filtered);
//       } catch (error) {
//         console.error('Error loading startups for account:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadUserStartups();
//   }, [user]);

//   const handleUpdateStartup = (updatedStartup: Startup) => {
//     setUserStartups((prev) =>
//       prev.map((s) => (s.name === updatedStartup.name ? updatedStartup : s))
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow bg-gray-50 p-8">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               {user && <p className="text-xl font-medium">Hi, {user.name}!</p>}
//               <h1 className="text-3xl font-bold">Your Account</h1>
//             </div>
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>
//           {loading ? (
//             <p>Loading your startups...</p>
//           ) : (
//             <>
//               {userStartups.length === 0 ? (
//                 <p>You are not listed as a founder for any startups.</p>
//               ) : (
//                 <div className="space-y-6">
//                   {userStartups.map((startup, index) => (
//                     <EditableStartupCard
//                       key={startup.name || index}
//                       startup={startup}
//                       onUpdate={handleUpdateStartup}
//                     />
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface Startup {
  name?: string; // primary key
  description?: string;
  industry?: string;
  founders?: string;
  stage?: string;
  team?: string;
  website?: string;
  problem?: string;
  solution?: string;
  timeline?: string;
  [key: string]: string | undefined;
}

function EditableStartupCard({
  startup,
  onUpdate,
}: {
  startup: Startup;
  onUpdate: (updatedStartup: Startup) => void;
}) {
  // Save the original name so we can identify the record even if the name is changed
  const [originalName, setOriginalName] = useState(startup.name);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Startup>({ ...startup });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    console.log('Attempting update for record with name:', originalName);
    try {
      // Use originalName to find the row
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
          solution: formData.solution,
          timeline: formData.timeline,
        })
        .eq('name', originalName)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      console.log('Update response data:', data);
      if (data && data.length > 0) {
        const updatedRow = data[0];
        onUpdate(updatedRow);
        // Update the originalName in case the name was changed
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
      <h2 className="text-2xl font-bold text-blue-900 mb-4">{editMode ? 'Edit Your Startup' : startup.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Startup Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
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
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
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
          className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Founders (comma-separated)</label>
          <input
            type="text"
            name="founders"
            value={formData.founders || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
          />
        </div>
        
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Industry (comma-separated)</label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ''}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Stage</label>
          <select
            name="stage"
            value={formData.stage || ''}
            onChange={handleChange as any}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
          >
            <option value="">Select Stage</option>
            <option value="Idea">Idea</option>
            <option value="Pre-seed">Pre-seed</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B+">Series B+</option>
            <option value="Growth">Growth</option>
          </select>
        </div>
        
        <div className="mb-2">
          <label className="block font-medium text-gray-700 mb-1">Yale Affiliation</label>
          <select
            name="team"
            value={formData.team || ''}
            onChange={handleChange as any}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
          >
            <option value="">Select Affiliation</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Professional School">Professional School</option>
            <option value="Faculty">Faculty</option>
            <option value="Alumni">Alumni</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Problem</label>
        <textarea
          name="problem"
          value={formData.problem || ''}
          onChange={handleChange}
          readOnly={!editMode}
          rows={3}
          className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
        />
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Solution</label>
        <textarea
          name="solution"
          value={formData.solution || ''}
          onChange={handleChange}
          readOnly={!editMode}
          rows={3}
          className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
        />
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Timeline</label>
        <textarea
          name="timeline"
          value={formData.timeline || ''}
          onChange={handleChange}
          readOnly={!editMode}
          rows={3}
          className={`w-full p-2 border rounded ${editMode ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400' : 'bg-gray-50 border-gray-200'}`}
        />
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

  useEffect(() => {
    async function loadUserStartups() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('startups').select('*');
        if (error) {
          throw error;
        }
        console.log('Fetched startups:', data);
        // Normalize the user's full name by removing spaces and lowercasing
        const normalizedUserName = user.name.replace(/\s+/g, '').toLowerCase();
        // Filter startups where the "founders" column (normalized) includes the user's full name.
        const filtered = data.filter((startup: Startup) => {
          if (!startup.founders) return false;
          const foundersList = startup.founders.split(',').map((f) =>
            f.replace(/\s+/g, '').toLowerCase()
          );
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
              {user && <p className="text-xl font-medium text-blue-700">Hi, {user.name}!</p>}
              <h1 className="text-3xl font-bold text-blue-900">Your Startup Dashboard</h1>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          
          {loading ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-lg text-gray-600">Loading your startups...</p>
            </div>
          ) : (
            <>
              {userStartups.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                  <p className="text-lg text-gray-600 mb-4">You are not listed as a founder for any startups.</p>
                  <p className="text-gray-500">
                    If your startup should be listed here, please make sure your name is included 
                    in the founders list exactly as it appears in your Yale account.
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
