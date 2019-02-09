import six
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
text1 = "seaweed puffer fish sharks whales i like hobbies and leisure seahorses swimming through the water. submarines exploring plankton. Something fish swim bubbles i go to the beach ocean things she sells sea shells by the seashore spongebob patrick the star barnacle boy"

def isOffTopic(idealTopic, text):
    print('hi')
    print(idealTopic)
    client = language.LanguageServiceClient()

    if isinstance(text, six.binary_type):
            text = text.decode('utf-8')

    document = types.Document(
            content=text.encode('utf-8'),
            type=enums.Document.Type.PLAIN_TEXT)

    categories = client.classify_text(document).categories
    d = dict()
    for category in categories:
        d[category.name] = category.confidence
        print(u'=' * 20)
        print(u'{:<16}: {}'.format('name', category.name))
        print(u'{:<16}: {}'.format('confidence', category.confidence))
    print(d)
    return len(d) > 1 and d[idealTopic] < 0.8
    # #All Notable Topics Discussed
    # cut = dict((k,v) for k, v in d.items() if v > 0.8)
    # #All Topics that were off Topic
    # print(cut)
    # offTopic = dict((k,v) for k, v in cut.items() if k != idealTopic)
    # # print(cut[idealTopic])
    # print(offTopic)
    # return len(offTopic) >= 1

    #print(offTopic)
    #print(cut[idealTopic])
    #return len(offTopic) == 1 and cut[idealTopic] != 0

#print(isOffTopic("/Hobbies & Leisure",text1))

def classify_file(idealTopic, gcs_uri):
    """Classifies content categories of the text in a Google Cloud Storage
    file.
    """
    client = language.LanguageServiceClient()

    document = types.Document(
        gcs_content_uri=gcs_uri,
        type=enums.Document.Type.PLAIN_TEXT)

    categories = client.classify_text(document).categories

    d = dict()
    for category in categories:
        d[category.name] = category.confidence
        print(u'=' * 20)
        print(u'{:<16}: {}'.format('name', category.name))
        print(u'{:<16}: {}'.format('confidence', category.confidence))

    #All Notable Topics Discussed
    cut = dict((k,v) for k, v in d.items() if v > 0.8)
    #All Topics that were off Topic
    offTopic = dict((k,v) for k, v in cut.items() if k != idealTopic)
    return offTopic

if __name__ == "__main__":
    offT = isOffTopic("/Adult", "shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark shark")
    print(offT)
