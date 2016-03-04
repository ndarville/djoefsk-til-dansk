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
    var verbLo = "beskære", // Infinitive
        verbHi = "Beskære", // Infinitive
        verbPerfLo = "beskåret",
        verbPerfHi = "Beskåret",
        nounLo = "nedskæring",
        nounHi = "Nedskæring",
        uberNounLo = "dummebøde",
        uberNounHi = "Dummebøde";

    // Budgetforbedring
    v = v.replace(/\bbudgetforbedring\b/g, nounLo);
    v = v.replace(/\bBudgetforbedring\b/g, nounHi);

    // Effektivisering
    v = v.replace(/\beffektivisering\b/g, nounLo);
    v = v.replace(/\bEffektivisering\b/g, nounHi);
    v = v.replace(/\beffektiviseret\b/g, verbPerfLo);
    v = v.replace(/\bEffektiviseret\b/g, verbPerfHi);
    v = v.replace(/\beffektivisere\b/g, verbLo);
    v = v.replace(/\bEffektivisere\b/g, verbHi);

    // Eftersyn
    v = v.replace(/\bserviceeftersyn\b/g, nounLo); // Place before `eftersyn`
    v = v.replace(/\bServiceftersyn\b/g, nounHi); // Place before `eftersyn`
    v = v.replace(/\beftersyn\b/g, nounLo);
    v = v.replace(/\bEftersyn\b/g, nounHi);

    // Omprioritering
    v = v.replace(/\bomprioriteringsbidrag\b/g, uberNounLo);
    v = v.replace(/\bOmprioriteringsbidrag\b/g, uberNounHi);

    v = v.replace(/\bomprioritering\b/g, nounLo);
    v = v.replace(/\bOmprioritering\b/g, nounHi);
    v = v.replace(/\bomprioriteret\b/g, verbPerfLo);
    v = v.replace(/\bOmprioriteret\b/g, verbPerfHi);
    v = v.replace(/\bomprioritere\b/g, verbLo);
    v = v.replace(/\bOmprioritere\b/g, verbHi);

    // Oprydning
    v = v.replace(/\boprydning\b/g, nounLo);
    v = v.replace(/\bOprydning\b/g, nounHi);

    // Normalisering
    v = v.replace(/\bnormalisering\b/g, nounLo);
    v = v.replace(/\bNormalisering\b/g, nounHi);
    v = v.replace(/\bnormaliseret\b/g, verbPerfLo);
    v = v.replace(/\bNormaliseret\b/g, verbPerfHi);
    v = v.replace(/\bnormalisere\b/g, verbLo);
    v = v.replace(/\bNormalisere\b/g, verbHi);

    // Servicetjek
    v = v.replace(/\bservicetjek\b/g, nounLo);
    v = v.replace(/\bServicetjek\b/g, nounHi);

    // Spareøvelse
    v = v.replace(/\bspareøvelse\b/g, nounLo);
    v = v.replace(/\bSpareøvelse\b/g, nounHi);

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
