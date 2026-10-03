import groq from "groq";

/**
 * Кусок запроса для картинки. Забирает сам ассет (из него билдер соберёт
 * URL любого размера) и его метаданные.
 *
 * Размеры НЕ заводятся руками в студии: Sanity считает их при загрузке
 * файла и кладёт в metadata.dimensions. Оттуда же берётся lqip.
 *
 * `...` обязателен: он оставляет исходный объект с asset._ref. Если
 * написать `asset->{...}`, ссылка потеряется и urlForImage сломается.
 */
export const IMAGE_FRAGMENT = groq`
  ...,
  "meta": asset->metadata {
    dimensions { width, height, aspectRatio },
    lqip
  }
`;

/** Объект `seo` любой страницы-синглтона. */
export const SEO_FRAGMENT = groq`
  title,
  description
`;

/** Ссылка: либо внешний адрес, либо внутренний путь. */
export const LINK_FRAGMENT = groq`
  label,
  url
`;

/**
 * Все поля фильма, какие рендерит сайт. Один фрагмент на главную, архив
 * и страницу проекта: если в схеме появится поле, добавить его нужно
 * в одном месте, и запросы не разъедутся между страницами.
 */
export const FILM_FRAGMENT = groq`
  title,
  "slug": slug.current,
  year,
  info,
  client,
  role,
  city,
  urlVimeo,
  isBig,
  isSelected,
  gif { ${IMAGE_FRAGMENT} },
  seo { ${SEO_FRAGMENT} }
`;
