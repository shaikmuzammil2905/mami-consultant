import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle, FileText, Award } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import ServiceCard from '../components/ServiceCard';
import { services as defaultServices } from '../data/services';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { useSiteContent } from '../context/ContentContext';

export default function ServiceDetails({ serviceIdProp }) {
  const { services = defaultServices } = useSiteContent();
  const { slug } = useParams();
  const targetId = serviceIdProp || slug;
  const service = services.find((s) => s.id === targetId) || defaultServices.find((s) => s.id === targetId);
  const { openModal } = useModal();

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#0B3566]">Service Not Found</h1>
        <p className="text-[#60758A]">Please explore our full list of healthcare career services.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm"
        >
          <span>View All Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <PageSEO
        title={`${service.title} | MAMI Career Consultant`}
        description={service.shortDescription}
      />
      <PageHero
        badge="MAMI Healthcare Service"
        title={service.title}
        subtitle={service.shortDescription}
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              openModal('service', {
                serviceName: service.title,
                title: `Enquire: ${service.title}`,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl(`Hello MAMI Career Consultant, I would like details about ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Consultation</span>
          </a>
        </div>
      </PageHero>

      {/* Main Details */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#EAFBFD] to-white shadow-xl border-2 border-[#CFEFF3] p-2.5 sm:p-3">
                <img
                  src={service.image_url || service.image}
                  alt={service.title}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">Service Overview</h2>
              <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
                {service.detailedDescription}
              </p>

              <div className="pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#0799A8] mb-2.5">
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                      <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] text-xs sm:text-sm text-[#007C91] font-medium">
                {service.pricingNote}
              </div>
            </div>
          </div>

          {/* Process, Eligibility, Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-mami rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[#0B3566] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0799A8]" />
                <span>Step-by-Step Process</span>
              </h3>
              <ol className="space-y-3">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <span className="w-6 h-6 rounded-full bg-[#EAFBFD] text-[#007C91] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-mami rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[#0B3566] mb-4">Eligibility</h3>
              <ul className="space-y-2.5">
                {service.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
              {service.authorities?.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#EAFBFD]">
                  <p className="text-xs font-bold text-[#007C91] uppercase mb-2">Covered Authorities / Scope</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.authorities.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-semibold"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="card-mami rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[#0B3566] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0799A8]" />
                <span>Required Documents</span>
              </h3>
              <ul className="space-y-2.5">
                {service.requiredDocuments.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Services */}
          <div className="pt-4">
            <h3 className="text-2xl font-extrabold text-[#0B3566] mb-6">Related Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel, idx) => (
                <ServiceCard key={rel.id} service={rel} index={idx} compact={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

