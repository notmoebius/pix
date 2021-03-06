export default function(server) {

  const courses = server.createList('course', 2, { name: 'course name' });
  server.createList('courseGroup', 3, { courses });

  server.loadFixtures('areas');
  server.loadFixtures('competences');

  const user = server.create('user', {
    id: 1,
    firstName: 'François',
    lastName: 'Hisquin',
    email: 'benjamin.marteau@gmail.com',
    password: 'FHI4EVER',
    cgu: true,
    recaptchaToken: 'recaptcha-token-xxxxxx',
    totalPixScore: '777',
    competenceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  });

  server.create('organization', { snapshots, userId: 1,  });
  const snapshots = server.createList('snapshot', 3, { organizationId: 1 });

  user.organizationsIds = [1];

}
