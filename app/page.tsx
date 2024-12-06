'use client'

import { useState } from 'react'
import { Search} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const mockPosts = [
  { id: 1, title: "Introduction to React", category: "React", content: "React is a popular JavaScript library for building user interfaces..." },
  { id: 2, title: "Getting Started with Next.js", category: "Next.js", content: "Next.js is a powerful framework for building React applications..." },
  { id: 3, title: "CSS-in-JS Solutions", category: "CSS", content: "CSS-in-JS is an approach to styling React components..." },
  { id: 4, title: "State Management in React", category: "React", content: "Effective state management is crucial for building scalable React applications..." },
  { id: 5, title: "Serverless Functions with Next.js", category: "Next.js", content: "Next.js provides built-in support for serverless functions..." },
]

const categories = ["All", "React", "Next.js", "CSS"]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = mockPosts.filter(post => 
    (selectedCategory === 'All' || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">Blog/Text Search</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" size={20} />
        </div>
        <div className="w-full md:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No results found.</p>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2 text-yellow-600">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Category: {post.category}</p>
              <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
              <Button variant="link" className="mt-2 p-0">Read more</Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

