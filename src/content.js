// Courtesy of ericwbailey <https://git.io/v2EEW>
// https://github.com/ericwbailey/millennials-to-snake-people

function walk(rootNode) {
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
    textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v) {
    var verbLo = "beskære",
        verbHi = "Beskære",
        verbPerfLo = "beskåret",
        verbPerfHi = "Beskåret";

    var nounLo = "nedskæring", // -en/-erne
        nounHi = "Nedskæring",
        nounPlLo = "nedskæringer",
        nounPlHi = "Nedskæringer",
        nounDefSgLo = "nedskæringen",
        nounDefSgHi = "Nedskæringen",
        nounDefPlLo = "nedskæringerne",
        nounDefPlHi = "Nedskæringerne";

    var uberNounLo = "dummebøde", // -en/-erne
        uberNounHi = "Dummebøde",
        uberNounDefSgLo = "dummebøden",
        uberNounDefSgHi = "Dummebøden",
        uberNounDefPlLo = "dummebøderne",
        uberNounDefPlHi = "Dummebøderne";

    // Budgetforbedring
    v = v.replace(/\bbudgetforbedring/g, nounLo);
    v = v.replace(/\bBudgetforbedring/g, nounHi);

    // Effektivisering
    v = v.replace(/\beffektivisering/g, nounLo);
    v = v.replace(/\bEffektivisering/g, nounHi);

    v = v.replace(/\beffektiviseret\b/g, verbPerfLo);
    v = v.replace(/\bEffektiviseret\b/g, verbPerfHi);
    v = v.replace(/\beffektivisere/g, verbLo);
    v = v.replace(/\bEffektivisere/g, verbHi);

    // Eftersyn (-et/-ene)
    v = v.replace(/\bserviceeftersynet\b/g, nounDefSgLo);
    v = v.replace(/\bServiceeftersynet\b/g, nounDefSgHi);
    v = v.replace(/\bserviceeftersynene\b/g, nounDefPlLo);
    v = v.replace(/\bServiceeftersynene\b/g, nounDefPlHi);
    v = v.replace(/\bserviceeftersyn\b/g, nounLo);
    v = v.replace(/\bServiceeftersyn\b/g, nounHi);

    v = v.replace(/\beftersynet\b/g, nounDefSgLo);
    v = v.replace(/\bEftersynet\b/g, nounDefSgHi);
    v = v.replace(/\beftersynene\b/g, nounDefPlLo);
    v = v.replace(/\bEftersynene\b/g, nounDefPlHi);
    v = v.replace(/\beftersyn\b/g, nounLo);
    v = v.replace(/\bEftersyn\b/g, nounHi);

    // Omprioriteringsbidrag (-et/-ene)
    v = v.replace(/\bomprioriteringsbidraget\b/g, uberNounDefSgLo);
    v = v.replace(/\bOmprioriteringsbidraget\b/g, uberNounDefSgHi);
    v = v.replace(/\bomprioriteringsbidragene\b/g, uberNounDefPlLo);
    v = v.replace(/\bOmprioriteringsbidragene\b/g, uberNounDefPlHi);
    v = v.replace(/\bomprioriteringsbidrag\b/g, uberNounLo);
    v = v.replace(/\bOmprioriteringsbidrag\b/g, uberNounHi);

    // Omprioritering
    v = v.replace(/\bomprioritering/g, nounLo);
    v = v.replace(/\bOmprioritering/g, nounHi);

    v = v.replace(/\bomprioriteret\b/g, verbPerfLo);
    v = v.replace(/\bOmprioriteret\b/g, verbPerfHi);
    v = v.replace(/\bomprioritere/g, verbLo);
    v = v.replace(/\bOmprioritere/g, verbHi);

    // Oprydning
    v = v.replace(/\boprydning/g, nounLo);
    v = v.replace(/\bOprydning/g, nounHi);

    // Normalisering
    v = v.replace(/\bnormalisering/g, nounLo);
    v = v.replace(/\bNormalisering/g, nounHi);

    v = v.replace(/\bnormaliseret\b/g, verbPerfLo);
    v = v.replace(/\bNormaliseret\b/g, verbPerfHi);
    v = v.replace(/\bnormalisere/g, verbLo);
    v = v.replace(/\bNormalisere/g, verbHi);

    // Servicetjek (-ket)
    v = v.replace(/\bservicetjekket\b/g, nounDefSgLo);
    v = v.replace(/\bServicetjekket\b/g, nounDefSgHi);
    v = v.replace(/\bservicetjek\b/g, nounLo);
    v = v.replace(/\bServicetjek\b/g, nounHi);

    // Spareøvelse
    v = v.replace(/\bspareøvelse/g, nounLo);
    v = v.replace(/\bSpareøvelse/g, nounHi);

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName("title")[0],
    observerConfig = {
        characterData : true,
        childList     : true,
        subtree       : true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
