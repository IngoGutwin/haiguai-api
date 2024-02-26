const path = require('node:path');

const homePage = {
  heroSection: {
    title: "hey, i'm Ingo, i love to build things with code",
    intro:
      'Passionate and driven programmer with a strong interest in creating new and innovative solutions through code. Constantly seeking to improve skills and stay up-to-date with industry developments to create better user experiences.',
    email: 'ingogutwin@gmail.com',
    github: 'https://www.github.com/IngoGutwin',
    linkedIn: 'https://www.linkedin.com/in/ingo-gutwin-16b151145',
    x: 'https://www.twitter.com/IngoGutwin',
  },
   
};

function getHomePage(req, res) {
  return res.sendFile(path.join(__dirname, '../../../public/index.html'));
}

module.exports = {
  getHomePage,
};
