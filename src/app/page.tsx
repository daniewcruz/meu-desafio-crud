import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="bg-primary/20 p-8 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-24 w-24 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sistema de Gerenciamento de Contatos
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl mb-8 text-base-content/70 max-w-2xl mx-auto">
              Organize, gerencie e mantenha todos os seus contatos em um só lugar. 
              Interface moderna e intuitiva para facilitar seu dia a dia.
            </p>

            {/* CTA Button */}
            <Link href="/contatos" className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Acessar Sistema
            </Link>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {/* Feature 1 */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="card-title text-primary">Criação Rápida</h3>
                  <p className="text-sm text-base-content/70">
                    Adicione novos contatos de forma rápida e intuitiva com formulários validados
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="bg-secondary/10 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-secondary">Busca Inteligente</h3>
                  <p className="text-sm text-base-content/70">
                    Encontre seus contatos rapidamente por nome, email ou telefone
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="bg-accent/10 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-accent">Edição Fácil</h3>
                  <p className="text-sm text-base-content/70">
                    Atualize informações dos seus contatos com apenas alguns cliques
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="stat-title">Segurança</div>
                <div className="stat-value text-primary text-2xl">100%</div>
                <div className="stat-desc">Dados protegidos</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="stat-title">Performance</div>
                <div className="stat-value text-secondary text-2xl">Rápido</div>
                <div className="stat-desc">Interface responsiva</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="stat-title">Design</div>
                <div className="stat-value text-accent text-2xl">Moderno</div>
                <div className="stat-desc">Interface intuitiva</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="font-semibold text-lg">Sistema de Gerenciamento de Contatos</p>
          <p className="text-sm opacity-70">Desenvolvido com Next.js, TypeScript e DaisyUI</p>
          <p className="text-xs opacity-50 mt-2">© 2026 - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

