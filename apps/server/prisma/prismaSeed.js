const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const groupNames = ["Awesome Team", "Code Crafters", "Dream Innovators"]

const spendingCases = [
  "Pizza Evening",
  "Uber Taxi",
  "Cocktail Evening",
  "Movie Night",
  "Grocery Shopping",
  "Restaurant Dinner",
  "Coffee Break",
  "Birthday Gift",
  "Tech Gadgets",
  "Weekend Getaway",
  "Beach Vacation",
  "Home Repairs",
  "Bookstore Haul",
  "Fitness Equipment",
  "Gardening Supplies",
  "Gourmet Cooking",
  "Hiking Adventure",
  "Furniture Shopping",
  "Art Supplies",
  "Music Concert",
  "Skiing Trip",
  "New Wardrobe",
  "Pet Care Supplies",
  "Home Decor",
  "Video Games",
  "Camping Gear",
  "Charity Donation",
  "Spa Day",
  "Wine Tasting",
  "DIY Projects",
  "Outdoor Furniture",
  "Tech Conference",
  "Home Theater System",
  "Photography Gear",
  "Beach Party",
  "Sporting Event Tickets",
  "Sailing Adventure",
  "Craft Beer Tasting",
  "Food Delivery",
  "Home Cinema Setup",
  "Luxury Watch",
  "Sushi Night",
  "Biking Tour",
  "Yoga Retreat",
  "Eco-friendly Products",
  "Antique Shopping",
  "Mountain Climbing",
  "Escape Room Experience",
  "Gourmet Coffee",
]

async function seed() {
  // Create 3 groups
  const groups = []
  for (const groupName of groupNames) {
    const group = await prisma.group.create({
      data: {
        groupName: groupName,
        groupEmail: `${groupName.replace(/\s/g, "").toLowerCase()}@example.com`,
        size: 7,
      },
    })
    groups.push(group)
  }

  // Seed each group with 7 distinct members
  for (const group of groups) {
    const uniqueMemberNames = new Set()

    while (uniqueMemberNames.size < 7) {
      const randomName = getRandomName(uniqueMemberNames)
      uniqueMemberNames.add(randomName)

      await prisma.user.create({
        data: {
          username: randomName,
          groupId: group.id,
        },
      })
    }
  }

  // Seed payment records with real spending cases
  for (const group of groups) {
    const groupMembers = await prisma.user.findMany({
      where: { groupId: group.id },
    })

    for (let i = 0; i < 10; i++) {
      const amount = (Math.floor(Math.random() * 1960) + 30) * 10 // Random amount between 3 and 199
      const randomCase =
        spendingCases[Math.floor(Math.random() * spendingCases.length)]
      const randomIndex = Math.floor(Math.random() * 7)
      const randomUserId = groupMembers[randomIndex].id

      await prisma.payment.create({
        data: {
          groupId: group.id,
          type: "payment",
          amount,
          currency: "EUR", // Change to 'USD' if needed
          purpose: randomCase,
          payingUserId: randomUserId,
        },
      })
    }
  }

  // Seed split records for payments
  for (const group of groups) {
    const payments = await prisma.payment.findMany({
      where: { groupId: group.id },
    })

    for (const payment of payments) {
      const { amount, payingUserId } = payment
      const groupMembers = await prisma.user.findMany({
        where: { groupId: group.id },
      })

      const splitAmount = amount / groupMembers.length

      for (const groupMember of groupMembers) {
        const splitData = {
          splitAmount:
            groupMember.id === payingUserId
              ? splitAmount * (groupMembers.length - 1)
              : -splitAmount,
          paymentId: payment.id,
          userId: groupMember.id,
        }

        await prisma.split.create({
          data: splitData,
        })
      }
    }
  }
}

function getRandomName(existingNames) {
  const allNames = [
    "Arol",
    "Bob",
    "Christian",
    "David",
    "Emma",
    "Frank Adams",
    "Grace",
    "Harold",
    "Igor",
    "Julian",
    "Kristian",
    "Luna",
    "Margarita",
    "Nathalie",
    "Olga",
    "Paul",
    "Rasmus",
    "Sabine",
    "Torsten",
    "Udo",
    "Victor",
  ]

  const availableNames = allNames.filter((name) => !existingNames.has(name))
  const randomIndex = Math.floor(Math.random() * availableNames.length)
  return availableNames[randomIndex]
}

seed()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
