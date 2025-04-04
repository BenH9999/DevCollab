'use client';

export function Projects() {
    return (
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-800 mb-2">Recent Projects</h3>
            <p className="text-gray-600 mb-4">You don't have any projects yet.</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800">
                Create your first project
            </button>
        </div>
    );
}