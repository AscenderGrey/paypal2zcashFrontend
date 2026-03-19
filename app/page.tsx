import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import ZcashSolution from '@/components/landing/ZcashSolution'
import WaitlistForm from '@/components/landing/WaitlistForm'
import SocialProof from '@/components/landing/SocialProof'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <ZcashSolution />
      <WaitlistForm />
      <SocialProof />
      <Footer />
    </main>
  )
}
