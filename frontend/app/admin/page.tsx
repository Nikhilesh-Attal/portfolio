import ProjectForm from "@/components/admin/projectForm";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your portfolio content here.</p>
        </header>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          
          {/* This renders the form we built in the last step! */}
          <ProjectForm />
          
        </div>

      </div>
    </div>
  );
}