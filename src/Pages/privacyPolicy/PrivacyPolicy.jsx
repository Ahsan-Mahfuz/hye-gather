import { useState, useRef, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Loader from '../loading/ReactLoader'
import {
  useGetPrivacyQuery,
  usePostPrivacyMutation,
} from '../../redux/privacyApis'

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const editor = useRef(null)

  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  const { data: privacyData, isLoading, isError } = useGetPrivacyQuery()
  const [updatePrivacy, { isLoading: isSaving }] = usePostPrivacyMutation()

  console.log(privacyData)

  useEffect(() => {
    if (privacyData?.data?.result?.desc) {
      setContent(privacyData.data.result.desc)
      setOriginalContent(privacyData.data.result.desc)
    }
  }, [privacyData])

  useEffect(() => {
    setHasChanges(content !== originalContent)
  }, [content, originalContent])

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all content?')) {
      setContent('')
    }
  }

  const handleSave = async () => {
    try {
      await updatePrivacy({
        name: 'privacy-policy',
        desc: content,
      }).unwrap()

      toast.success('Privacy policy saved successfully!')
      setOriginalContent(content)
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save privacy policy:', error)
      toast.error('Failed to save privacy policy. Please try again.')
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to discard them?'
        )
      ) {
        setContent(originalContent)
      }
    } else {
      navigate(-1)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Failed to load privacy policy. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="mb-10">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleCancel}
      >
        <h1 className="text-xl font-semibold mt-5">← Privacy Policy</h1>
      </div>

      <div className="w-full px-6 py-8 bg-white rounded-lg mt-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Privacy Policy</h2>
        <p className="text-gray-600 mb-6">
          Update your website&apos;s privacy policy content below. Click Save
          when you&apos;re finished.
        </p>

        <div className="flex flex-col w-full">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={handleContentChange}
            config={{
              buttons:
                'bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source',
              height: 500,
              placeholder: 'Enter your privacy policy content here...',
              toolbarAdaptive: false,
            }}
            className="border rounded-md"
          />

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              disabled={isSaving || !content}
            >
              Clear
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
              disabled={isSaving || !hasChanges}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
