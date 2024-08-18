<script lang="ts">
	import { writable } from 'svelte/store';
	import type { IModalSettings, IModalShowParams } from '../../types/types';
	import { setContext } from 'svelte';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import CreateModal from '../../components/Modals/CreateModal.svelte';
	import { variantsValues, typesValues, typesTranslate } from './modalTypes';
	import api from '../../api';
	import { useQueryClient } from '@tanstack/svelte-query';
	import RemoveModal from '../../components/Modals/RemoveModal.svelte';

	const client = useQueryClient();

	const submit = ({ type, variant }: Omit<IModalShowParams, 'initialData'>) => {
		if (variant === 'create') {
			return async (formData: any) => {
				const result: any = await api.post(`/${type}/create`, formData);
				if (type === 'house' && result.data.success) {
					client.invalidateQueries(['house']);
				}
				if (type === 'device' && result.data.success) {
					client.invalidateQueries(['rooms']);
					client.invalidateQueries(['unusedDevices']);
				}
				return result;
			};
		}
		if (variant === 'edit') {
			return async (formData: any, id: number) => {
				const result: any = await api.put(`/${type}/update/${id}`, formData);
				if (type === 'house' && result.data.success) {
					client.invalidateQueries(['house']);
				}
				if ((type === 'rooms' || type === 'device') && result.data.success) {
					client.invalidateQueries(['rooms']);
					client.invalidateQueries(['unusedDevices']);
				}
				return result;
			};
		}
		if (variant === 'delete') {
			return async (id: number) => {
				const result: any = await api.delete(`/${type}/delete/${id}`);
				if (type === 'house' && result.data.success) {
					client.invalidateQueries(['house']);
				}
				if (type === 'device' && result.data.success) {
					client.invalidateQueries(['rooms']);
					client.invalidateQueries(['unusedDevices']);
				}
				return result;
			};
		}
	};

	const handleDelete = ({ variant = null, type = null, initialData }: IModalShowParams) => {
		const [typesTranslation, typesTranslationMany] = [typesTranslate[type], typesTranslate[type + 's']];

		const modalComponent: ModalComponent = {
			ref: RemoveModal,
			props: {
				title: `Удалить ${typesTranslationMany}`,
				text: `Вы действительно хотите удалить ${typesTranslationMany}? ${initialData?.name ? `(${initialData.name})` : ''}`,
				onSubmit: submit({ type, variant }),
				initialData,
			},
		};

		const modalSettings: ModalSettings = {
			type: 'component',
			component: modalComponent,
		};
		modalStore.trigger(modalSettings);
	};

	const show = ({ variant = null, type = null, initialData }: IModalShowParams) => {
		if (!variant || !type) {
			return;
		}

		if (variant === 'delete') {
			handleDelete({ variant, type, initialData });
			return;
		}

		const [variantData, typeData] = [variantsValues[variant], typesValues[type]];
		const typesTranslation = typesTranslate[type];
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				typeData,
				variant,
				initialData,
				title: `${variantData.title} ${typesTranslation}`,
				buttonText: variantData.buttonText,
				onSubmit: submit({ type, variant }),
			},
		};

		const modalSettings: ModalSettings = {
			type: 'component',
			component: modalComponent,
		};
		modalStore.trigger(modalSettings);
	};

	const modalConfig = writable<IModalSettings>({
		show: show,
		close: () => {
			modalStore.close();
		},
		refetchSpaces: () => {},
	});

	setContext('modalConfig', modalConfig);
</script>

<slot />
