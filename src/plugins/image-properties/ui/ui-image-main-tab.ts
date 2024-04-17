/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

import type { IViewBased } from 'jodit/types';
import { component } from 'jodit/core/decorators/component/component';
import { watch } from 'jodit/core/decorators/watch/watch';
import { UIGroup } from 'jodit/core/ui/group/group';

import type { ImagePropertiesAPI, ImagePropertiesState } from '../interface';

@component
export class UIImageMainTab extends UIGroup {
	override className(): string {
		return 'UIImageMainTab';
	}

	override appendChildToContainer(): void {
		// Do nothing
	}

	constructor(
		view: IViewBased,
		private state: ImagePropertiesState,
		private handlers: ImagePropertiesAPI
	) {
		super(view);
	}

	protected override render(): string {
		return `<div class="jodit-form__group &__editSrc">
			<label>~Src~</label>
			<div class="jodit-input_group">
				<input class="jodit-input &__imageSrc" type="text"/>
				<div class="jodit-input_group-buttons">
						<a class="jodit-button &__changeImage">*image*</a>
						<a class="jodit-button &__editImage">*crop*</a>
				</div>
			</div>
		</div>
		<div class="jodit-form__group &__editTitle">
			<label>~Title~</label>
			<input type="text" class="jodit-input &__imageTitle"/>
		</div>
		<div class="jodit-form__group &__editAlt">
			<label>~Alternative~</label>
			<input type="text" class="jodit-input &__imageAlt"/>
		</div>
		<div class="jodit-form__group &__editLink">
			<label>~Link~</label>
			<input type="text" class="jodit-input &__imageLink"/>
		</div>
		<div class="jodit-form__group &__editLinkTarget">
			<label class="jodit_vertical_middle">
				<input type="checkbox" class="jodit-checkbox &__imageLinkOpenInNewTab"/>
				<span>~Open link in new tab~</span>
			</label>
		</div>`;
	}

	@watch('state.values.imageSrc')
	protected async onStateImageSrcChange(): Promise<void> {
		const imageSrc = this.getElm('imageSrc') as HTMLInputElement;
		imageSrc.value = this.state.values.imageSrc;

		const image = new Image();
		image.src = this.state.values.imageSrc;
		image.decode().then(
			() => {
				imageSrc.classList.remove('jodit-error');
				this.state.image = image;
			},
			() => {
				imageSrc.classList.add('jodit-error');
			}
		);
	}

	@watch('imageSrc:change')
	protected onImageSrcChange(): void {
		this.state.values.imageSrc = (
			this.getElm('imageSrc') as HTMLInputElement
		).value;
	}

	/**
	 * Open image editor
	 */
	@watch('editImage:click')
	protected onEditImageClick(e: MouseEvent): void {
		this.handlers.openImageEditor();
		e.stopPropagation();
	}

	/**
	 * Open popup with filebrowser/uploader buttons for image
	 */
	@watch('changeImage:click')
	protected onChangeImageClick(e: MouseEvent): void {
		this.handlers.openImagePopup(e);
		e.stopPropagation();
	}

	@watch('state.values.imageTitle')
	protected onStateTitleChange(): void {
		const title = this.getElm('imageTitle') as HTMLInputElement;
		title.value = this.state.values.imageTitle;
	}

	@watch('imageTitle:change')
	protected onTitleChange(): void {
		this.state.values.imageTitle = (
			this.getElm('imageTitle') as HTMLInputElement
		).value;
	}

	@watch('state.values.imageAlt')
	protected onStateAltChange(): void {
		const alt = this.getElm('imageAlt') as HTMLInputElement;
		alt.value = this.state.values.imageAlt;
	}

	@watch('imageAlt:change')
	protected onAltChange(): void {
		this.state.values.imageAlt = (
			this.getElm('imageAlt') as HTMLInputElement
		).value;
	}

	@watch('state.values.imageLink')
	protected onStateImageLinkChange(): void {
		const imageLink = this.getElm('imageLink') as HTMLInputElement;
		imageLink.value = this.state.values.imageLink;
	}

	@watch('imageLink:change')
	protected onImageLinkChange(): void {
		this.state.values.imageLink = (
			this.getElm('imageLink') as HTMLInputElement
		).value;
	}

	@watch('state.values.imageLinkOpenInNewTab')
	protected onStateImageLinkOpenInNewTabChange(): void {
		const imageLinkOpenInNewTab = this.getElm(
			'imageLinkOpenInNewTab'
		) as HTMLInputElement;
		imageLinkOpenInNewTab.checked = this.state.values.imageLinkOpenInNewTab;
	}

	@watch('imageLinkOpenInNewTab:change')
	protected onImageLinkOpenInNewTabChange(): void {
		this.state.values.imageLinkOpenInNewTab = (
			this.getElm('imageLinkOpenInNewTab') as HTMLInputElement
		).checked;
	}
}
