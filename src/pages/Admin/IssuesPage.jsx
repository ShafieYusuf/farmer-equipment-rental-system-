import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaCheckCircle, FaExclamationTriangle, FaClock, 
  FaEllipsisH, FaCommentAlt
} from 'react-icons/fa';

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock data - in a real app, this would come from an API
  const mockIssues = [
    {
      id: 1,
      title: 'Tractor booking payment failed but amount deducted',
      description: 'I tried to book a John Deere tractor for next week but the payment failed. However, the amount was deducted from my account. Please help resolve this issue.',
      status: 'open',
      priority: 'high',
      category: 'payment',
      createdAt: '2023-10-15T14:30:00',
      updatedAt: '2023-10-15T14:30:00',
      userId: 12,
      userName: 'Michael Johnson',
      userEmail: 'michael.j@example.com',
      bookingId: 'BK-78945',
      messages: [
        {
          id: 1,
          text: 'I tried to book a John Deere tractor for next week but the payment failed. However, the amount was deducted from my account. Please help resolve this issue.',
          sender: 'user',
          timestamp: '2023-10-15T14:30:00',
          userName: 'Michael Johnson'
        }
      ]
    },
    {
      id: 2,
      title: 'Equipment received in damaged condition',
      description: 'The seeder I rented arrived with broken parts and is not usable. I need an immediate replacement or refund.',
      status: 'in_progress',
      priority: 'high',
      category: 'equipment',
      createdAt: '2023-10-14T09:15:00',
      updatedAt: '2023-10-15T11:20:00',
      userId: 8,
      userName: 'Sarah Williams',
      userEmail: 'sarah.w@example.com',
      bookingId: 'BK-78123',
      messages: [
        {
          id: 1,
          text: 'The seeder I rented arrived with broken parts and is not usable. I need an immediate replacement or refund.',
          sender: 'user',
          timestamp: '2023-10-14T09:15:00',
          userName: 'Sarah Williams'
        },
        {
          id: 2,
          text: 'We apologize for the inconvenience. Can you please send photos of the damaged parts so we can process this quickly?',
          sender: 'admin',
          timestamp: '2023-10-14T10:30:00',
          userName: 'Admin Support'
        },
        {
          id: 3,
          text: 'I have sent the photos to your email. Please check and let me know what happens next.',
          sender: 'user',
          timestamp: '2023-10-15T11:20:00',
          userName: 'Sarah Williams'
        }
      ]
    },
    {
      id: 3,
      title: 'Unable to update profile information',
      description: 'When I try to update my phone number in my profile, I get an error message saying "Update failed".',
      status: 'resolved',
      priority: 'medium',
      category: 'account',
      createdAt: '2023-10-10T16:45:00',
      updatedAt: '2023-10-12T13:30:00',
      userId: 23,
      userName: 'David Brown',
      userEmail: 'david.b@example.com',
      bookingId: null,
      messages: [
        {
          id: 1,
          text: 'When I try to update my phone number in my profile, I get an error message saying "Update failed".',
          sender: 'user',
          timestamp: '2023-10-10T16:45:00',
          userName: 'David Brown'
        },
        {
          id: 2,
          text: 'Thank you for reporting this. We are looking into the issue and will get back to you shortly.',
          sender: 'admin',
          timestamp: '2023-10-11T09:20:00',
          userName: 'Admin Support'
        },
        {
          id: 3,
          text: 'We have identified and fixed the problem. Please try updating your profile again.',
          sender: 'admin',
          timestamp: '2023-10-12T11:15:00',
          userName: 'Admin Support'
        },
        {
          id: 4,
          text: 'It works now. Thank you for the quick resolution!',
          sender: 'user',
          timestamp: '2023-10-12T13:30:00',
          userName: 'David Brown'
        }
      ]
    },
    {
      id: 4,
      title: 'Booking cancellation refund not received',
      description: 'I cancelled my booking for the irrigation system 5 days ago but haven\'t received my refund yet.',
      status: 'open',
      priority: 'medium',
      category: 'payment',
      createdAt: '2023-10-13T11:00:00',
      updatedAt: '2023-10-13T11:00:00',
      userId: 17,
      userName: 'Emily Davis',
      userEmail: 'emily.d@example.com',
      bookingId: 'BK-77432',
      messages: [
        {
          id: 1,
          text: 'I cancelled my booking for the irrigation system 5 days ago but haven\'t received my refund yet.',
          sender: 'user',
          timestamp: '2023-10-13T11:00:00',
          userName: 'Emily Davis'
        }
      ]
    },
    {
      id: 5,
      title: 'Equipment owner not responding',
      description: 'I have questions about the drone I want to rent, but the equipment owner hasn\'t responded to my messages for 3 days.',
      status: 'in_progress',
      priority: 'low',
      category: 'communication',
      createdAt: '2023-10-12T14:20:00',
      updatedAt: '2023-10-14T16:10:00',
      userId: 31,
      userName: 'Robert Wilson',
      userEmail: 'robert.w@example.com',
      bookingId: null,
      messages: [
        {
          id: 1,
          text: 'I have questions about the drone I want to rent, but the equipment owner hasn\'t responded to my messages for 3 days.',
          sender: 'user',
          timestamp: '2023-10-12T14:20:00',
          userName: 'Robert Wilson'
        },
        {
          id: 2,
          text: 'We will contact the equipment owner and ask them to respond to your inquiry as soon as possible.',
          sender: 'admin',
          timestamp: '2023-10-14T16:10:00',
          userName: 'Admin Support'
        }
      ]
    }
  ];

  // Simulate API call to fetch issues
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      setIssues(mockIssues);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort issues
  const filteredIssues = issues
    .filter(issue => {
      if (filter === 'all') return true;
      return issue.status === filter;
    })
    .filter(issue => {
      if (!searchQuery) return true;
      return (
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (issue.bookingId && issue.bookingId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (a[sortField] > b[sortField]) {
        comparison = 1;
      } else if (a[sortField] < b[sortField]) {
        comparison = -1;
      }
      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

  // Handle status change
  const handleStatusChange = (issueId, newStatus) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() } : issue
    ));
    
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue({ ...selectedIssue, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  // Handle reply submission
  const handleReplySubmit = (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    const newMessage = {
      id: selectedIssue.messages.length + 1,
      text: replyText,
      sender: 'admin',
      timestamp: new Date().toISOString(),
      userName: 'Admin Support'
    };
    
    const updatedIssue = {
      ...selectedIssue,
      messages: [...selectedIssue.messages, newMessage],
      updatedAt: new Date().toISOString()
    };
    
    setIssues(issues.map(issue => 
      issue.id === selectedIssue.id ? updatedIssue : issue
    ));
    
    setSelectedIssue(updatedIssue);
    setReplyText('');
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaExclamationTriangle className="mr-1" size={12} />
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaClock className="mr-1" size={12} />
            In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" size={12} />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Support Issues</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries and problems</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search and Filter Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search issues..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'open' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter('resolved')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
          
          {/* Issues List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No issues found matching your criteria.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredIssues.map((issue) => (
                <li 
                  key={issue.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedIssue?.id === issue.id ? 'bg-gray-50' : ''}`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <div className="flex justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                      <p className="text-xs text-gray-500">
                        {issue.userName} • {formatDate(issue.createdAt)}
                      </p>
                    </div>
                    <div className="ml-2">
                      {getStatusBadge(issue.status)}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getPriorityBadge(issue.priority)}
                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {issue.category}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {issue.messages.length} {issue.messages.length === 1 ? 'message' : 'messages'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Issue Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          {selectedIssue ? (
            <div className="h-full flex flex-col">
              {/* Issue Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{selectedIssue.title}</h2>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedIssue.status)}
                    <div className="relative inline-block text-left">
                      <button
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                      >
                        <FaEllipsisH size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Reported by:</span> {selectedIssue.userName} ({selectedIssue.userEmail})
                  </div>
                  {selectedIssue.bookingId && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Booking ID:</span> {selectedIssue.bookingId}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Created:</span> {formatDate(selectedIssue.createdAt)}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(selectedIssue.id, 'open')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedIssue.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Mark as Open
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedIssue.id, 'in_progress')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedIssue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Mark as In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedIssue.id, 'resolved')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedIssue.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedIssue.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-lg rounded-lg px-4 py-2 ${
                        message.sender === 'admin'
                          ? 'bg-green-100 text-green-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {message.userName} • {formatDate(message.timestamp)}
                      </div>
                      <div className="text-sm">{message.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Reply Form */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleReplySubmit} className="flex items-start space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCommentAlt className="mr-2" size={16} />
                    Send Reply
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaCommentAlt className="mx-auto text-gray-400 mb-4" size={48} />
                <p>Select an issue to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuesPage; 