import discord
from dotenv import load_dotenv
import os

intents = discord.Intents.default()
intents.members = True
intents.message_content = True

client = discord.Client(intents=intents)


@client.event
async def on_ready():
  print(f"Successfully logged in as {client.user}")


@client.event
async def on_member_join(member):

  guild_var = member.guild
  this_role = discord.utils.get(guild_var.roles,id=int(804556086597255168))
  await member.add_roles(this_role)


  print(f"Sending Direct Message to {member.name}...")

  await member.send(f"""Hello {member.name}, welcome to {member.guild.name}!)

    I'm Foxbot, written by Saucy Fox of FoxTrot!
    
    You have been assigned to the 'Lil-Smokies' group!
    The groups you will see on this server are:
    
    Admin
    Heaters
    Glizzy Gang
    Goon Squad
    Lil Smokies
    

    Please send a message to the the Admin with any   
    questions. 

    Have fun! """)
  
load_dotenv('.env')

client.run(os.getenv(TOKEN))