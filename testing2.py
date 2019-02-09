import six
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
text = "seaweed puffer fish sharks whales seahorses swimming through the water. submarines exploring plankton. Something fish swim bubbles i go to the beach ocean things she sells sea shells by the seashore spongebob patrick the star barnacle boy"

client = language.LanguageServiceClient()

if isinstance(text, six.binary_type):
	text = text.decode('utf-8')

document = types.Document(
	content=text.encode('utf-8'),
	type=enums.Document.Type.PLAIN_TEXT)

categories = client.classify_text(document).categories

for category in categories:
	print(u'=' * 20)
	print(u'{:<16}: {}'.format('name', category.name))
	print(u'{:<16}: {}'.format('confidence', category.confidence))

print("End")
