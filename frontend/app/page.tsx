import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl mb-4 inline-block">🏆</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Turn Your Ideas Into <span className="text-yellow-600">Gold</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            El Dorado is an AI-powered website generator that transforms your business vision 
            into revenue-ready websites in minutes.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <Link href="/auth">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold mb-2">Speak Your Vision</h3>
              <p className="text-gray-600">
                Describe your business goals and let AI understand your needs
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p className="text-gray-600">
                Advanced AI creates your complete website structure and content
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Deploy Instantly</h3>
              <p className="text-gray-600">
                One-click deployment with custom domain and SEO optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
