/**
 * Class to hold information about the node attached to an input element.
 * Used to control behavior based on node information.
 */
export class NodeInfo {
    /**
     * @param {string} nodeType - The type/class name of the node
     * @param {string} inputName - The name of the input widget
     */
    constructor(nodeType, inputName) {
        this.nodeType = nodeType;
        this.inputName = inputName;
    }

    /**
     * Attempt to infer NodeInfo from a DOM element by traversing its ancestors.
     * Looks for data-* attributes that indicate node type and input name.
     * Used in Nodes 2.0 where widget instances are not directly available.
     * @param {HTMLElement} element - The DOM element (typically a textarea)
     * @returns {NodeInfo} Inferred NodeInfo, or a fallback with 'Unknown'/'unknown' if inference fails
     */
    static fromElement(element) {
        let current = element;
        let nodeType = null;
        let inputName = null;

        while (current && current !== document.body) {
            // Check common Nodes 2.0 data attributes for node type
            if (!nodeType) {
                nodeType = current.dataset?.nodeType
                    || current.dataset?.comfyClass
                    || current.getAttribute?.('data-node-type')
                    || current.getAttribute?.('data-comfy-class');
            }
            // Check for input/widget name attribute
            if (!inputName) {
                inputName = current.dataset?.inputName
                    || current.dataset?.widgetName
                    || current.getAttribute?.('data-input-name')
                    || current.getAttribute?.('data-widget-name');
            }

            if (nodeType && inputName) break;
            current = current.parentElement;
        }

        return new NodeInfo(nodeType || 'Unknown', inputName || 'unknown');
    }
}
