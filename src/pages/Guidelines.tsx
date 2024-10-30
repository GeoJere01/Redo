import React from 'react';
import { FileText, Download, ExternalLink, Search } from 'lucide-react';

export function Guidelines() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Research Resources</h1>
        <p className="text-gray-600 mt-2">Access guides, papers, and tools to support your research</p>
      </header>

      <div className="card mb-8">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="input-field flex-1"
          />
          <button className="btn-primary">
            <Search className="w-4 h-4 mr-2 inline-block" />
            Search
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Latest Resources</h2>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-gray-600 hover:text-gray-900">
                    {resource.type === 'download' ? (
                      <Download className="w-5 h-5" />
                    ) : (
                      <ExternalLink className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Guides</h2>
          <div className="card divide-y">
            {guides.map((guide, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const resources = [
  {
    title: "Research Methods Handbook",
    description: "Comprehensive guide to research methodologies and best practices",
    tags: ["Methods", "Guide", "Fundamentals"],
    type: "download"
  },
  {
    title: "Statistical Analysis Tools",
    description: "Collection of tools and templates for data analysis",
    tags: ["Statistics", "Data", "Tools"],
    type: "download"
  },
  {
    title: "Academic Writing Guidelines",
    description: "Best practices for writing research papers and proposals",
    tags: ["Writing", "Academic", "Guide"],
    type: "link"
  }
];

const guides = [
  {
    title: "Getting Started with Research",
    duration: "10 min read"
  },
  {
    title: "Literature Review Tips",
    duration: "15 min read"
  },
  {
    title: "Data Collection Methods",
    duration: "12 min read"
  },
  {
    title: "Citation Guidelines",
    duration: "8 min read"
  }
];