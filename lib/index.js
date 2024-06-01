/**
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean} [skipHeadings=true]
 *   Include headings to `id`s (default: `false`).
 * @property {string} [prefix='']
 *   Prefix to use (default: `''`).
 */


import { visit } from "unist-util-visit";
import { headingRank } from 'hast-util-heading-rank'
import getUuid from 'uuid-by-string'

/** @type {Options} */
const defaultOptions = {
    skipHeadings: false,
    prefix: ""
}

const ocurrences = new Map()

/**
 * Add `id`s to all elements.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeId(options) {
    const config = options || defaultOptions
    const prefix = config.prefix || defaultOptions.prefix

    /**
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
        visit(tree, 'element', function (node) {
            if (!node.properties.id && (!(headingRank(node)) || !config.skipHeadings)) {
                node.properties.id = prefix + slug(node)
            }
        })
    }
}

/**
 * Generate a slug.
 *
 * Track previously generated slugs: repeated calls with the same node
 * will result in the same prefix slug with an updated occurrence differentiator.
 *
 * @param  {any} node
 *   String of text to slugify
 * @return {string}
 *   A unique slug string
 */
export function slug(node) {
    if (typeof value !== 'string') return ''
    const result = node.tagName + "-" + getUuid(node.children.map(child => child.value).join("")).split("-")[0]
    if (ocurrences.has(result)) {
        ocurrences.set(result, ocurrences.get(result) + 1)
        return result + "-" + ocurrences.get(result)
    } else {
        ocurrences.set(result, 1)
        return result
    }
}