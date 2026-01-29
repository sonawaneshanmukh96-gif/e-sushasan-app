import { db } from "@/lib/db";
import { 
  Plus, 
  Calendar, 
  FileText, 
  Download, 
  ExternalLink,
  Upload,
  Clock,
  CheckCircle2
} from "lucide-react";

export default async function CommitteesPage() {
  // Fetch committees and include their related tasks
  const committees = await db.committees.findMany({
    include: {
      tasks: true,
    },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="flex-1 min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Committees</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage executive committees and meetings.</p>
        </header>

        <div className="space-y-10">
          {committees.map((committee) => (
            <div key={committee.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* 1. Header Section */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{committee.name}</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Chairman: <span className="text-gray-900 font-bold">{committee.chairman_name || 'Collector'}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 text-gray-400">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={16} className="text-blue-500" />
                    Last Meeting: 20 Jan 2026
                  </div>
                  <button className="text-indigo-600 flex items-center gap-1.5 text-sm font-bold hover:underline">
                    <ExternalLink size={16} />
                    View Latest MoM
                  </button>
                </div>
              </div>

              {/* 2. Tasks Section */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Committee Tasks</h3>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                    <Plus size={18} />
                    Create Task
                  </button>
                </div>

                <div className="space-y-3">
                  {committee.tasks.map((task) => (
                    <div key={task.id} className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:border-indigo-200 transition-all">
                      <span className="text-base font-semibold text-gray-700">{task.title}</span>
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        task.status === 'PENDING' 
                        ? 'bg-orange-50 text-orange-600 border-orange-100' 
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      }`}>
                        {task.status === 'PENDING' ? 'Pending Chairman Approval' : 'Open'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Documents Section */}
              <div className="p-8 bg-gray-50/30 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Supporting Documents</h3>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                    <Upload size={18} />
                    Upload New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">GR-2026-Guidelines.pdf</p>
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase mt-1">PDF • Admin • 2026-01-20</p>
                      </div>
                    </div>
                    <Download size={20} className="text-gray-300 group-hover:text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}