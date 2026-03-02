import { useState } from 'react'
import { MessageCircle, Mail } from 'lucide-react'

// WhatsApp SVG Icon
const WhatsAppIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={props.width || 28}
    height={props.height || 28}
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.075.149.198 2.099 3.205 5.077 4.372.711.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347zm-5.421 6.318h-.001a8.77 8.77 0 01-4.473-1.232l-.321-.191-3.326.849.889-3.244-.209-.332a8.727 8.727 0 01-1.337-4.626c.001-4.825 3.936-8.758 8.762-8.758 2.339 0 4.533.911 6.188 2.565a8.68 8.68 0 012.563 6.18c-.002 4.825-3.936 8.758-8.762 8.758zm7.163-15.924A10.408 10.408 0 0012.05 1.5C6.212 1.5 1.5 6.211 1.5 12.049c0 1.795.468 3.541 1.356 5.077l-1.443 5.271a1.001 1.001 0 00.979 1.263c.082 0 .164-.01.246-.03l5.292-1.352a10.52 10.52 0 004.12.832h.005c5.838 0 10.55-4.711 10.55-10.549 0-2.817-1.099-5.467-3.093-7.461z" />
  </svg>
);

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
            <WhatsAppIcon width={28} height={28} />
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
