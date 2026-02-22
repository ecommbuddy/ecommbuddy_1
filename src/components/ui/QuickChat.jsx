import { useState } from 'react'
import { MessageCircle, Mail, Phone } from 'lucide-react'

const QuickChat = () => {
  const [open, setOpen] = useState(false)

  // Move up from bottom: 40% from top (or 60% from bottom)
  return (
    <div className="fixed right-6 z-50 flex flex-col items-end" style={{ bottom: '40%', top: 'auto' }}>
      {/* Main Chat Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-[#ffd6c2] transition-all focus:outline-none border-2 border-[#ef4900]"
        aria-label="Quick Chat"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
      >
        <MessageCircle className="w-7 h-7" style={{ color: '#ef4900' }} />
      </button>

      {/* Chat Options */}
      {open && (
        <div className="flex flex-col items-end animate-fade-in-up">
          <a
            href="https://wa.me/916388201024"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow flex items-center justify-center w-14 h-14 transition-all mb-6"
            aria-label="WhatsApp Chat"
            style={{ marginTop: '22px' }}
          >
            <Phone className="w-7 h-7" />
          </a>
          <a
            href="mailto:harshit@ecommbuddy.in"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow flex items-center justify-center w-14 h-14 transition-all"
            aria-label="Email Chat"
          >
            <Mail className="w-7 h-7" />
          </a>
        </div>
      )}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default QuickChat
