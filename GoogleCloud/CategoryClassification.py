import six
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
text1 = "seaweed puffer fish sharks whales seahorses swimming through the water. submarines exploring plankton. Something fish swim bubbles i go to the beach ocean things she sells sea shells by the seashore spongebob patrick the star barnacle boy"

def analyze(text):
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

def classify_file(gcs_uri):
    """Classifies content categories of the text in a Google Cloud Storage
    file.
    """
    client = language.LanguageServiceClient()

    document = types.Document(
        gcs_content_uri=gcs_uri,
        type=enums.Document.Type.PLAIN_TEXT)

    categories = client.classify_text(document).categories

    for category in categories:
        print(u'=' * 20)
        print(u'{:<16}: {}'.format('name', category.name))
        print(u'{:<16}: {}'.format('confidence', category.confidence))
