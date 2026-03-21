import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Shield, Zap, Globe, Users, Calendar, Trophy } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const featuredCourts = [
    {
      id: 1,
      name: 'Kathmandu Futsal Arena',
      location: 'Putalisadak, Kathmandu',
      rating: 4.8,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&h=600',
    },
    {
      id: 2,
      name: 'Patan Kings Futsal',
      location: 'Pulchowk, Lalitpur',
      rating: 4.7,
      price: 1200,
      image: 'https://images.unsplash.com/photo-1526232759583-02f4db0a513b?q=80&w=800&h=600',
    },
    {
      id: 3,
      name: 'Bhakatpur Sports Hub',
      location: 'Suryabinayak, Bhaktapur',
      rating: 4.9,
      price: 1000,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&h=600',
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0c10]">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay scale-110"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1920&q=80)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/60 via-[#0a0c10]/80 to-[#0a0c10]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
                <span className="text-sm font-bold text-indigo-300 tracking-wide uppercase">The Future of Futsal is Here</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                ELEVATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">YOUR GAME</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                Seamless booking, premium courts, and a community of strikers. Find your pitch and dominate the game today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <button
                    onClick={() => navigate('/browse-courts')}
                    className="group relative px-10 py-5 bg-white text-indigo-950 font-black text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.4)] flex items-center gap-3"
                >
                    BOOK A PITCH
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={() => navigate('/browse-courts')}
                    className="px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-bold text-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                    EXPLORE LOCATIONS
                </button>
            </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Featured Courts - Grid Design */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div>
                    <div className="text-indigo-600 font-black text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-indigo-600"></div>
                        Elite Selection
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                        FEATURED <span className="italic text-indigo-900/10">STADIUMS</span>
                    </h2>
                </div>
                <button 
                  onClick={() => navigate('/browse-courts')}
                  className="group flex items-center gap-2 text-indigo-900 font-black text-lg hover:gap-4 transition-all"
                >
                    VIEW ALL VENUES <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredCourts.map((court) => (
                    <div key={court.id} className="group cursor-pointer">
                        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100 shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                            <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex items-center gap-1 text-amber-400 mb-2">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-bold text-white">{court.rating}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tight">{court.name}</h3>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                    <MapPin className="w-4 h-4" />
                                    {court.location}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-white font-black text-2xl">
                                        Rs. {court.price}<span className="text-xs text-gray-500 font-bold tracking-widest lowercase ml-2">/hour</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white text-indigo-950 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Experience Section - How it works */}
      <section className="py-32 bg-[#f8f9fc] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="relative">
                      <div className="aspect-square rounded-[48px] overflow-hidden bg-gray-200 shadow-2xl">
                          <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&h=800" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-10 -right-10 bg-indigo-900 rounded-[32px] p-10 shadow-2xl border-4 border-white animate-bounce-slow">
                          <div className="text-white">
                              <div className="text-4xl font-black mb-1">10k+</div>
                              <div className="text-sm font-bold opacity-60 uppercase tracking-widest">Players Active</div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="space-y-12">
                      <div>
                        <div className="text-indigo-600 font-black text-sm tracking-widest uppercase mb-4">The Experience</div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-6">WHY PLAY WITH <br /> <span className="text-indigo-900 underline decoration-indigo-200 underline-offset-8">FLOW?</span></h2>
                        <p className="text-xl text-gray-600 leading-relaxed italic">"We didn't just build a booking app. We built the perfect digital teammate for every futsal lover."</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {[
                              { icon: Zap, title: "Instant Booking", desc: "No more phone calls. Book your pitch in 3 clicks." },
                              { icon: Shield, title: "Verified Courts", desc: "Only the best astroturf and lighting systems." },
                              { icon: Globe, title: "National Network", desc: "Play anywhere, from Kathmandu to Pokhara." },
                              { icon: Trophy, title: "Rewards System", desc: "Play 10 games, get the next one on us." }
                          ].map((item, idx) => (
                              <div key={idx} className="flex gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center flex-shrink-0">
                                      <item.icon className="w-6 h-6 text-indigo-600" />
                                  </div>
                                  <div>
                                      <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{item.title}</h4>
                                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Modern Stats Banner */}
      <section className="py-20 bg-indigo-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  {[
                      { label: "Courts Ready", val: "50+" },
                      { label: "Active Strikers", val: "12K+" },
                      { label: "Daily Matches", val: "200+" },
                      { label: "Satisfaction", val: "99%" }
                  ].map((stat, idx) => (
                      <div key={idx} className="space-y-2 group">
                          <div className="text-4xl md:text-6xl font-black tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.val}</div>
                          <div className="text-xs font-bold text-indigo-300 uppercase tracking-[0.2em]">{stat.label}</div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[48px] p-12 md:p-24 relative overflow-hidden shadow-2xl group">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10"></div>
                  <h2 className="relative z-10 text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">Ready to take the <br /> pitch by storm?</h2>
                  <button onClick={() => navigate('/browse-courts')} className="relative z-10 px-12 py-5 bg-white text-indigo-950 font-black text-xl rounded-2xl hover:bg-gray-100 transition shadow-2xl flex items-center gap-3 mx-auto">
                      FIND A COURT NOW
                      <Zap className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </button>
              </div>
          </div>
      </section>
    </div>
  );
}
