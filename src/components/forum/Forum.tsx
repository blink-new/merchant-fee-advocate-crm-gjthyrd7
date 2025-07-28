import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Clock,
  Users,
  ThumbsUp,
  MessageCircle,
  Crown
} from 'lucide-react'
import { blink } from '@/blink/client'

interface ForumProps {
  user: any
}

interface ForumPost {
  id: string
  userId: string
  userEmail: string
  title: string
  content: string
  category: string
  isPinned: boolean
  likes: number
  replies: number
  createdAt: string
  updatedAt: string
}

interface ForumReply {
  id: string
  postId: string
  userId: string
  userEmail: string
  content: string
  createdAt: string
}

export function Forum({ user }: ForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [replies, setReplies] = useState<ForumReply[]>([])
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Posts', color: 'bg-gray-100 text-gray-800' },
    { id: 'general', name: 'General Discussion', color: 'bg-blue-100 text-blue-800' },
    { id: 'training', name: 'Training & Tips', color: 'bg-green-100 text-green-800' },
    { id: 'leads', name: 'Lead Generation', color: 'bg-purple-100 text-purple-800' },
    { id: 'success', name: 'Success Stories', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'support', name: 'Support', color: 'bg-red-100 text-red-800' },
  ]

  const isAdmin = user?.email === 'admin@merchantfeeadvocate.com'

  const loadPosts = async () => {
    try {
      const forumPosts = await blink.db.forumPosts.list({
        orderBy: { isPinned: 'desc', createdAt: 'desc' }
      })
      setPosts(forumPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadReplies = async () => {
    try {
      const forumReplies = await blink.db.forumReplies.list({
        orderBy: { createdAt: 'asc' }
      })
      setReplies(forumReplies)
    } catch (error) {
      console.error('Error loading replies:', error)
    }
  }

  useEffect(() => {
    loadPosts()
    loadReplies()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getPostReplies = (postId: string) => {
    return replies.filter(reply => reply.postId === postId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.color || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (selectedPost) {
    return <PostDetail 
      post={selectedPost} 
      replies={getPostReplies(selectedPost.id)}
      user={user}
      onBack={() => setSelectedPost(null)}
      onReplyAdded={loadReplies}
    />
  }

  if (showNewPost) {
    return <NewPostForm 
      user={user}
      categories={categories.filter(c => c.id !== 'all')}
      onCancel={() => setShowNewPost(false)}
      onPostCreated={() => {
        setShowNewPost(false)
        loadPosts()
      }}
    />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect, learn, and grow together</p>
        </div>
        <Button onClick={() => setShowNewPost(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id ? 'bg-blue-600 text-white' : category.color
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">Total Posts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{posts.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">Total Replies</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{replies.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">Active Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to start a discussion!'
              }
            </p>
            <Button onClick={() => setShowNewPost(true)} variant="outline">
              Create First Post
            </Button>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-blue-600" />
                    )}
                    <Badge className={getCategoryColor(post.category)}>
                      {categories.find(c => c.id === post.category)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {post.userEmail.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600 flex items-center">
                        {post.userEmail === 'admin@merchantfeeadvocate.com' && (
                          <Crown className="w-3 h-3 text-yellow-500 mr-1" />
                        )}
                        {post.userEmail}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {getPostReplies(post.id).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// New Post Form Component
function NewPostForm({ user, categories, onCancel, onPostCreated }: any) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [isPinned, setIsPinned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isAdmin = user?.email === 'admin@merchantfeeadvocate.com'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)
    try {
      await blink.db.forumPosts.create({
        userId: user.id,
        userEmail: user.email,
        title: title.trim(),
        content: content.trim(),
        category,
        isPinned: isPinned && isAdmin,
        likes: 0,
        replies: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      onPostCreated()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {isAdmin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="pinned" className="text-sm text-gray-700">
                Pin this post (Admin only)
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Post Detail Component
function PostDetail({ post, replies, user, onBack, onReplyAdded }: any) {
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    try {
      await blink.db.forumReplies.create({
        postId: post.id,
        userId: user.id,
        userEmail: user.email,
        content: replyContent.trim(),
        createdAt: new Date().toISOString()
      })
      setReplyContent('')
      onReplyAdded()
    } catch (error) {
      console.error('Error creating reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Back to Forum
      </Button>

      {/* Original Post */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {post.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
            <Badge className="bg-blue-100 text-blue-800">{post.category}</Badge>
          </div>
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center">
            <Avatar className="w-8 h-8 mr-3">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {post.userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 flex items-center">
              {post.userEmail === 'admin@merchantfeeadvocate.com' && (
                <Crown className="w-3 h-3 text-yellow-500 mr-1" />
              )}
              {post.userEmail}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {post.likes}
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {replies.length}
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Replies ({replies.length})
        </h3>
        
        {replies.map((reply: any) => (
          <div key={reply.id} className="bg-white rounded-lg border p-4 ml-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                    {reply.userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 flex items-center">
                  {reply.userEmail === 'admin@merchantfeeadvocate.com' && (
                    <Crown className="w-3 h-3 text-yellow-500 mr-1" />
                  )}
                  {reply.userEmail}
                </span>
              </div>
              <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-lg border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Reply</h4>
        <form onSubmit={handleReply} className="space-y-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting || !replyContent.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Posting...' : 'Post Reply'}
          </Button>
        </form>
      </div>
    </div>
  )
}