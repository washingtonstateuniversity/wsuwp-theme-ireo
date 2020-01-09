/**
 * Registers the scrolling section block.
 */

const {
	registerBlockType,
} = wp.blocks;

const {
	__,
} = wp.i18n;

const {
	InnerBlocks,
} = ( 'undefined' === typeof wp.blockEditor ) ? wp.editor : wp.blockEditor;

registerBlockType( 'happyprime/scrolling-section', {

	parent: [ 'happyprime/scrolling-sections' ],

	title: __( 'Scrolling Section' ),

	description: __( 'Create a full-height scrolling section' ),

	icon: 'media-default',

	category: 'common',

	edit: () => {
		return (
			<article>
				<InnerBlocks />
			</article>
		);
	},

	save: () => {
		return (
			<article>
				<InnerBlocks.Content />
			</article>
		);
	},

} );