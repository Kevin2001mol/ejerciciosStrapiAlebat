import type { Schema, Struct } from '@strapi/strapi';

export interface DetailsExperience extends Struct.ComponentSchema {
  collectionName: 'components_details_experiences';
  info: {
    description: '';
    displayName: "teacher's details";
    icon: 'crown';
  };
  attributes: {
    experience: Schema.Attribute.RichText;
    speciality: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DetailsSchedule extends Struct.ComponentSchema {
  collectionName: 'components_details_schedules';
  info: {
    description: '';
    displayName: 'class details';
    icon: 'archive';
  };
  attributes: {
    classroom: Schema.Attribute.String & Schema.Attribute.Required;
    Schedule: Schema.Attribute.Time;
  };
}

export interface DetailsSite extends Struct.ComponentSchema {
  collectionName: 'components_details_sites';
  info: {
    description: '';
    displayName: 'event details';
    icon: 'house';
  };
  attributes: {
    Date: Schema.Attribute.Date &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Schedule: Schema.Attribute.Time &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Site: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'event.theme', true>;
  };
}

export interface DynamicHeaderUrl extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_header_urls';
  info: {
    displayName: 'headerUrl';
    icon: 'archive';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    tittle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface DynamicImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_image_galleries';
  info: {
    description: '';
    displayName: 'image gallery';
    icon: 'chartBubble';
  };
  attributes: {
    carousel: Schema.Attribute.Media<'images', true>;
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface DynamicMedia extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_media';
  info: {
    displayName: 'media';
    icon: 'cast';
  };
  attributes: {
    carousel: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    links: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface EventSubtheme extends Struct.ComponentSchema {
  collectionName: 'components_event_subthemes';
  info: {
    displayName: 'subtheme';
    icon: 'calendar';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventTheme extends Struct.ComponentSchema {
  collectionName: 'components_event_themes';
  info: {
    description: '';
    displayName: 'theme';
    icon: 'gate';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    subtheme: Schema.Attribute.Component<'event.subtheme', true>;
  };
}

export interface StudyMaterialsMedia extends Struct.ComponentSchema {
  collectionName: 'components_study_materials_media';
  info: {
    displayName: 'media';
    icon: 'brush';
  };
  attributes: {
    Audio: Schema.Attribute.Media<'audios', true>;
    Image: Schema.Attribute.Media<'images', true>;
    Video: Schema.Attribute.Media<'videos', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'details.experience': DetailsExperience;
      'details.schedule': DetailsSchedule;
      'details.site': DetailsSite;
      'dynamic.header-url': DynamicHeaderUrl;
      'dynamic.image-gallery': DynamicImageGallery;
      'dynamic.media': DynamicMedia;
      'event.subtheme': EventSubtheme;
      'event.theme': EventTheme;
      'study-materials.media': StudyMaterialsMedia;
    }
  }
}
