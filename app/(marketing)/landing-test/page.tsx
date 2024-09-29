import {
  CTA,
  FAQ,
  FeatureOne,
  FeatureThree,
  FeatureTwo,
  Footer,
  Hero,
  PricingTest,
  SocialProof,
  Testimonials
} from '@/components/ui/MarketingSections';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Example() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);
  return (
    <div>
      <Hero />
      <SocialProof />
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
      <Testimonials />
      <PricingTest
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
