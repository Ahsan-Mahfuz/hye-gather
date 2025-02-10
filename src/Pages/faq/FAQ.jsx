import { useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Modal, Input, Button } from 'antd'
import toast from 'react-hot-toast'

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What is Hye Gather?',
      answer:
        'Hye Gather is a platform that connects you with trusted Armenian vendors for events, making planning easy and stress-free.',
    },
    {
      id: 2,
      question: 'How do I find and book a vendor?',
      answer:
        'Browse by category, use search filters, and contact vendors directly through their profiles to book their services.',
    },
    {
      id: 3,
      question: 'Is there a fee to use Hye Gather?',
      answer:
        'No, Hye Gather is free for clients to browse and connect with vendors.',
    },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [editingFaq, setEditingFaq] = useState(null)
  const [faqToDelete, setFaqToDelete] = useState(null)
  const Navigate = useNavigate()

  const handleDelete = (id) => {
    setFaqToDelete(id)
    setDeleteModalVisible(true)
  }

  const handleConfirmDelete = () => {
    setFaqs(faqs.filter((faq) => faq.id !== faqToDelete))
    setDeleteModalVisible(false)
    setFaqToDelete(null)
    toast.success('FAQ deleted successfully!')
  }

  const openModal = (faq = null) => {
    setEditingFaq(faq)
    setNewFaq(
      faq
        ? { question: faq.question, answer: faq.answer }
        : { question: '', answer: '' }
    )
    setModalVisible(true)
  }

  const handleSave = () => {
    if (editingFaq) {
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingFaq.id ? { ...faq, ...newFaq } : faq
        )
      )
    } else {
      setFaqs([...faqs, { id: Date.now(), ...newFaq }])
    }
    setModalVisible(false)
    setNewFaq({ question: '', answer: '' })
    setEditingFaq(null)
    toast.success('FAQ saved successfully!')
  }

  return (
    <div>
      <h1
        className="text-xl font-semibold cursor-pointer my-5"
        onClick={() => Navigate(-1)}
      >
        ← FAQ
      </h1>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">FAQ Management</h2>
            <p className="text-gray-600 text-sm">
              Manage and update frequently asked questions to assist users in
              finding information easily.
            </p>
          </div>
          <button
            className="p-2 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-700"
            onClick={() => openModal()}
          >
            <FaPlus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-blue-800 text-white rounded shadow-md hover:bg-blue-700"
                    onClick={() => openModal(faq)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={700}
      >
        <div className="p-5 ">
          <div className="text-2xl font-bold text-center">
            {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
          </div>
          <p className="text-center text-gray-600">
            Please fill out the details below to add a new FAQ.
          </p>
          <label
            htmlFor="question"
            className="font-bold "
            style={{ marginTop: '20px' }}
          >
            Question
          </label>
          <Input
            placeholder="Question"
            className="mb-5 h-[42px]"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />
          <label htmlFor="answer" className="font-bold">
            Answer
          </label>
          <Input.TextArea
            placeholder="Answer"
            className="mb-5"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />
          <Button
            type="primary"
            onClick={handleSave}
            style={{ display: 'block', margin: 'auto' }}
          >
            {editingFaq ? 'Update' : 'Add'} FAQ
          </Button>
        </div>
      </Modal>
      <Modal
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
        centered
      >
        <div className="p-5">
          <p className="text-center font-bold text-2xl mb-2">Delete FAQ</p>
          <div className='text-center text-red-700 text-xl'>Are you sure you want to delete this FAQ?</div>
        </div>
      </Modal>
    </div>
  )
}

export default FAQ
