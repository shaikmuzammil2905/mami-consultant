import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function ServiceGrid({ compact = true }) {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive Support for Your International Healthcare Career"
        />

        <div
          className={
            compact
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 sm:gap-4'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
          }
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              compact={compact}
              className={
                compact && idx === services.length - 1
                  ? 'col-span-2 sm:col-span-1 xl:col-span-1'
                  : ''
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

