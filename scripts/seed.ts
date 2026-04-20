import { getPrisma } from '../src/lib/prisma'

async function main() {
  console.log('Seeding database...')

  // Create Andrea tenant
  const andrea = await getPrisma().tenant.upsert({
    where: { slug: 'andrea' },
    update: {},
    create: {
      slug: 'andrea',
      name: 'Andrea Bertoli',
      primaryColor: '#2d5016',
      accentColor: '#d4a373',
    },
  })
  console.log('Created tenant:', andrea.name)

  // Create Christopher tenant
  const christopher = await getPrisma().tenant.upsert({
    where: { slug: 'christopher' },
    update: {},
    create: {
      slug: 'christopher',
      name: 'Christopher Brown Therapy',
      primaryColor: '#2d5016',
      accentColor: '#d4a373',
    },
  })
  console.log('Created tenant:', christopher.name)

  // Create tiers for Andrea
  const freeTier = await getPrisma().tier.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'free' } },
    update: {},
    create: {
      tenantId: andrea.id,
      slug: 'free',
      name: 'Free',
      description: 'Access to free content and lead magnet',
      price: 0,
      level: 0,
      features: JSON.stringify([
        'Lead magnet bundle',
        'Free monthly live events',
        'Weekly Substack content',
      ]),
    },
  })
  console.log('Created tier:', freeTier.name)

  const depthSeekerTier = await getPrisma().tier.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'depth_seeker' } },
    update: {},
    create: {
      tenantId: andrea.id,
      slug: 'depth_seeker',
      name: 'Depth Seeker',
      description: 'All mini-courses, workshops, and resources',
      price: 1500, // $15
      level: 10,
      features: JSON.stringify([
        'All mini-courses (10+ hours)',
        'Workshop recording library',
        'Downloadable workbooks & templates',
        'Guided meditations & breathwork',
        'Monthly new content drops',
        '10% discount on 1:1 coaching',
      ]),
    },
  })
  console.log('Created tier:', depthSeekerTier.name)

  const activeLearnerTier = await getPrisma().tier.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'active_learner' } },
    update: {},
    create: {
      tenantId: andrea.id,
      slug: 'active_learner',
      name: 'Active Learner',
      description: 'Everything plus live monthly coaching calls',
      price: 7500, // $75
      level: 20,
      features: JSON.stringify([
        'Everything in Depth Seeker',
        'Monthly live group coaching calls',
        'Replay access to all Q&A sessions',
        'Direct Q&A submission (1/week)',
        'Webinar bundles (exclusive access)',
        '15% discount on 1:1 coaching',
        'Priority support & beta access',
      ]),
    },
  })
  console.log('Created tier:', activeLearnerTier.name)

  // Create sample collection
  const foundationsCollection = await getPrisma().collection.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'sexual-foundations' } },
    update: {},
    create: {
      tenantId: andrea.id,
      slug: 'sexual-foundations',
      title: 'Sexual Foundations for Women',
      description: 'A 3-part mini-course on understanding your body, desire, and pleasure.',
      sortOrder: 1,
    },
  })
  console.log('Created collection:', foundationsCollection.title)

  // Create sample content
  const lesson1 = await getPrisma().content.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'lesson-1-body-literacy' } },
    update: {},
    create: {
      tenantId: andrea.id,
      collectionId: foundationsCollection.id,
      slug: 'lesson-1-body-literacy',
      title: 'Lesson 1: Body Literacy',
      description: 'Understanding your anatomy and how pleasure works in your body.',
      type: 'mini_course',
      requiredTierLevel: 10, // Depth Seeker+
      duration: '25 min',
      youtubeUrl: 'https://youtube.com/embed/placeholder',
      bodyContent: 'This is where the lesson notes and additional resources would go.',
      sortOrder: 1,
      published: false, // Set to true when ready
    },
  })
  console.log('Created content:', lesson1.title)

  // Create flagship product
  const flagshipProduct = await getPrisma().product.upsert({
    where: { tenantId_slug: { tenantId: andrea.id, slug: 'perimenopausal-pivot' } },
    update: {},
    create: {
      tenantId: andrea.id,
      slug: 'perimenopausal-pivot',
      title: 'Perimenopausal Pivot',
      description: 'A 3-month transformational cohort program for women navigating midlife intimacy and perimenopause.',
      type: 'flagship_program',
      price: 79700, // $797
      tierPricing: JSON.stringify({
        free: 79700,
        depth_seeker: 69700,
        active_learner: 59700,
      }),
      published: false,
    },
  })
  console.log('Created product:', flagshipProduct.title)

  console.log('\n✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await getPrisma().$disconnect()
  })