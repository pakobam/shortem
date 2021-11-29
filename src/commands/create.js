module.exports = {
  name: 'create',
	async execute(msg, db, Joi) {
    var slug = msg.options.getString('slug');
    var url = msg.options.getString('url');

    if(!slug || !url)return await msg.reply({ embeds: [{ description: 'Something Went Wrong', color: '#e83838' }], ephemeral: true });

   if(!url.startsWith('https://') && !url.startsWith('http://')){
      return await msg.reply({ embeds: [{ description: 'Please Provide A Protocol', color: '#e83838' }], ephemeral: true });
    }
    if(url.startsWith('https://') || url.startsWith('http://')){
    url = url.substring(url.indexOf("/")+2);
    }
    if(url.includes('ink.is-a.dev'))  return await msg.reply({ embeds: [{ description: "Don't Try To Break Me", color: '#e83838' }], ephemeral: true });
    if(url.includes('/')){
      url = url.split('/')[0];
    }

     var datas = await db.list();
     var data;
    for(e of datas) {
     if(e.startsWith(`${slug}`)) {
       data = (await db.get(e));
     }
      }   
       if(data)return await msg.reply({ embeds: [{ description: 'Slug Exist', color: '#e83838' }], ephemeral: true });

    const schema = Joi.object({
      url: Joi.string().domain({ tlds: true }).required(),
      slug: Joi.string().pattern(/^[\w\-]+$/i).required()
    });
    try{
     await schema.validateAsync({
       url: url,
       slug: slug
     });
    }catch(e){
      return msg.reply({ embeds: [{ description: 'Please Provide A Valid URL & Slug', color: '#e83838' }], ephemeral: true });
    }
    await db.set(`${slug}/${msg.user.id}`, msg.options.getString('url')).then(async () => {
      await msg.reply({
        embeds: [{
          title: 'Success !',
          description: `**Slug:** [\`${slug.split('/')[0]}\`](https://ink.is-a.dev/${slug.split('/')[0]})\n**URL:** \`${msg.options.getString('url')}\``,
          color: '#03fc2c'
        }]
      })
    })
	},
};
