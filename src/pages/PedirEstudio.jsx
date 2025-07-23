import { useState } from 'react'
import IntroEstudio from '../components/IntroEstudio'
import Paso1 from '../components/Paso1'
import Paso2 from '../components/Paso2'
import Paso3 from '../components/Paso3'
import Paso4 from '../components/Paso4'
import Header from '../components/Header'


export default function PedirEstudio() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    telefono: '',
    email: '',
    tipo: '',    // 'estandar' | 'urgente'
    cv: null,    // File
    visitorId: '', // si lo usas
  })

  return (
    <>
      <Header />
      <div className="container py-4">
        {step === 1 && (
          <Paso1
            form={form}
            setForm={setForm}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Paso2
            form={form}
            setForm={setForm}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Paso3
            form={form}
            setForm={setForm}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <Paso4
            form={form}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </>
  )
}
