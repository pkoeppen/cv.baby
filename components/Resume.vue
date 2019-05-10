<template>
  <v-container>
    <v-layout row justify-center align-center wrap>
      <v-flex xs7 sm5 md4 lg3>
        <div style="position: relative;">
          <v-img
            :src="require('@/assets/images/avatar.svg')"
            :lazy-src="require('@/assets/images/avatar.svg')"
            aspect-ratio="1"
            class="cv-avatar"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-layout>
            </template>
          </v-img>
          <div class="spark-container spark-container-1">
            <div class="spark" />
          </div>
          <div class="spark-container spark-container-2">
            <div class="spark" />
          </div>
          <div class="spark-container spark-container-3">
            <div class="spark" />
          </div>
          <div class="spark-container spark-container-4">
            <div class="spark" />
          </div>
          <div class="spark-container spark-container-5">
            <div class="spark" />
          </div>
          <div class="spark-container spark-container-6">
            <div class="spark" />
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="cv-name text-xs-center font-weight-thin">{{ name }}</div>
        <div class="cv-title text-xs-center font-weight-thin">{{ title }}</div>
      </v-flex>
      <v-flex xs12 class="text-xs-center my-3">
        <v-chip
          v-for="(skill, index) in skillsCurated.skills"
          :key="index"
          outline
        >
          <strong>{{ skill }}</strong>
        </v-chip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip
              v-if="skillsCurated.additional.length > 0"
              color="primary"
              text-color="white"
              class="cv-chip-additional"
              v-on="on"
            >
              <strong>+{{ skillsCurated.additional.length }}</strong>
            </v-chip>
          </template>
          <div
            v-for="(skill, index) in skillsCurated.additional"
            :key="index"
            @click="foo = 1"
            class="text-xs-center"
          >
            {{ skill }}
          </div>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 sm8 md6>
        <p class="cv-profile font-weight-light text-xs-center my-0">
          {{ profile }}
        </p>
      </v-flex>
      <v-flex xs12 class="my-5">
        <hr style="width: 15%; margin: 0 auto; color: #EEEEEE;" />
      </v-flex>
      <template v-if="sections.employment">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="section-header" text-color="white">Employment</span>
          </v-toolbar>
        </v-flex>
        <v-flex v-if="$mq === 'lg'" class="px-5" xs12 lg10>
          <v-timeline>
            <v-timeline-item
              v-for="(item, index) in sections.employment"
              :key="index"
              :color="item.color"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${item.color}--text`"
                  v-text="item.date"
                ></span>
              </template>
              <div class="py-3">
                <h2
                  :class="`headline font-weight-light mb-3 ${item.color}--text`"
                >
                  {{ item.title }}
                </h2>
                <p>
                  {{ item.company }} Lorem ipsum dolor sit amet, no nam oblique
                  veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit, an vim
                  zril disputando voluptatibus, vix an salutandi sententiae.
                </p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex v-else xs12 sm9 offset-sm3 md8 offset-md4>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(item, index) in sections.employment"
              :key="index"
              :color="item.color"
              small
            >
              <v-layout pt-3>
                <v-flex xs3>
                  <strong>{{ item.date }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.title }}</strong>
                  <div class="caption">{{ item.company }}</div>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                    ></v-img>
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </template>
      <template v-if="sections.education">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="section-header" text-color="white">Education</span>
          </v-toolbar>
        </v-flex>
        <v-flex v-if="$mq === 'lg'" class="px-5" xs12 lg10>
          <v-timeline>
            <v-timeline-item
              v-for="(item, index) in sections.education"
              :key="index"
              :color="item.color"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${item.color}--text`"
                  v-text="item.date"
                ></span>
              </template>
              <div class="py-3">
                <h2
                  :class="`headline font-weight-light mb-3 ${item.color}--text`"
                >
                  {{ item.university }}
                </h2>
                <p>
                  {{ item.degree }} Lorem ipsum dolor sit amet, no nam oblique
                  veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit, an vim
                  zril disputando voluptatibus, vix an salutandi sententiae.
                </p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex v-else xs12 sm9 offset-sm3 md8 offset-md4>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(item, index) in sections.education"
              :key="index"
              :color="item.color"
              small
            >
              <v-layout pt-3>
                <v-flex xs3>
                  <strong>{{ item.date }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.university }}</strong>
                  <div class="caption">{{ item.degree }}</div>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                    ></v-img>
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </template>
      <template v-if="sections.references">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="section-header" text-color="white">References</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="py-3 px-4" xs12 lg10>
          <v-container grid-list-xl>
            <v-layout
              row
              wrap
              align-items-center
              justify-center
              fill-height
              class="references-layout"
            >
              <v-flex
                v-for="(reference, index) in sections.references"
                :key="index"
                xs12
                sm6
                md4
              >
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                  >
                    <v-card-title class="justify-center">
                      <h3 class="headline">{{ reference.name }}</h3>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="text-xs-center">
                      <span>
                        {{ reference.title }} at
                        <a :href="reference.companyLink">{{
                          reference.company
                        }}</a>
                      </span>
                      <br />
                      <span>
                        Acquainted
                        <strong>{{ reference.yearsKnown }} years</strong>
                      </span>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions class="justify-center">
                      <v-dialog v-model="contactDialog[index]" width="400">
                        <template v-slot:activator="{ on }">
                          <v-btn color="blue" flat v-on="on">
                            Show Contact
                            <v-icon class="pl-1">lock</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-layout row justify-space-between align-center>
                            <v-flex grow pa-3>
                              <v-card-title class="headline pa-0" primary-title>
                                {{ reference.name }}
                              </v-card-title>
                              <div class="caption pl-1">
                                {{ reference.title }} @
                                <a :href="reference.companyLink">{{
                                  reference.company
                                }}</a>
                              </div>
                            </v-flex>
                            <v-flex shrink pa-3>
                              <v-icon class="green--text">vpn_lock</v-icon>
                            </v-flex>
                          </v-layout>

                          <v-divider />

                          <v-list class="pa-0">
                            <v-template v-if="reference.phone">
                              <v-list-tile :href="`tel:${reference.phone}`">
                                <v-list-tile-action>
                                  <v-icon>phone</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.phone }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-icon>chat</v-icon>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider />
                            </v-template>

                            <v-template v-if="reference.email">
                              <v-list-tile :href="`mailto:${reference.email}`">
                                <v-list-tile-action>
                                  <v-icon>mail</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.email }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-icon>chat</v-icon>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider />
                            </v-template>

                            <v-template v-if="reference.website">
                              <v-list-tile :href="`${reference.website}`">
                                <v-list-tile-action>
                                  <v-icon>public</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.website }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                              </v-list-tile>
                              <v-divider />
                            </v-template>
                          </v-list>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              flat
                              @click="contactDialog[index] = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </template>
      <template v-if="sections.personal">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="section-header" text-color="white">Personal</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="px-3" xs12 lg10>
          <v-container
            v-if="sections.personal.hobbies"
            class="my-3"
            grid-list-xl
          >
            <v-layout
              row
              wrap
              align-items-center
              justify-center
              fill-height
              class="hobbies-layout"
            >
              <v-flex
                v-for="(hobby, index) in sections.personal.hobbies"
                :key="index"
                xs6
                sm4
                md2
              >
                <v-img
                  :src="require(`@/assets/images/hobbies/${hobby.id}.svg`)"
                  :lazy-src="require(`@/assets/images/hobbies/${hobby.id}.svg`)"
                  aspect-ratio="1"
                  class="cv-avatar"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-layout>
                  </template>
                </v-img>
                <div
                  class="caption text-xs-center text-uppercase font-weight-bold mt-2"
                >
                  {{ hobby.name }}
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex
          v-if="sections.personal.description"
          :class="{
            'mt-5': !sections.personal.hobbies,
            'mb-4': true
          }"
          xs10
          lg8
        >
          <h3
            class="headline text-xs-center font-weight-light font-italic grey--text mb-3"
          >
            About me
          </h3>
          <v-divider class="mb-4" />
          <p class="mb-5 mt-2 text-xs-center">
            {{ sections.personal.description }}
          </p>
        </v-flex>
      </template>
      <template v-if="sections.contact">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="section-header" text-color="white">Contact</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="pa-5" xs12 lg10>
          <v-card class="py-4">
            <v-layout row align-center wrap>
              <v-flex xs12 lg6>
                <div class="cv-name text-xs-center font-weight-thin">
                  {{ name }}
                </div>
                <div class="cv-title text-xs-center font-weight-thin">
                  {{ title }}
                </div>
                <div v-if="sections.contact.social" class="text-xs-center my-4">
                  <span
                    v-for="(platform, index) in sections.contact.social"
                    :key="index"
                  >
                    <a :href="platform.link" class="cv-link">
                      <i :class="`fab fa-${platform.name}-square fa-2x`"></i>
                    </a>
                  </span>
                </div>
              </v-flex>
              <v-flex xs12 lg6>
                <v-list>
                  <v-list-tile
                    v-if="sections.contact.phone"
                    :href="`tel:${sections.contact.phone}`"
                  >
                    <v-list-tile-action>
                      <v-icon>phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ sections.contact.phone }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile
                    v-if="sections.contact.email"
                    :href="`mailto:${sections.contact.email}`"
                  >
                    <v-list-tile-action>
                      <v-icon>mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ sections.contact.email }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile
                    v-if="sections.contact.email"
                    :href="`${sections.contact.website}`"
                  >
                    <v-list-tile-action>
                      <v-icon>public</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ sections.contact.website }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contactDialog: {
        '0': false,
        '1': false,
        '2': false
      },
      name: 'Joe Example',
      title: 'UI/UX designer',
      skills: ['UI', 'UX', 'photoshop', 'illustrator', 'javascript'],
      profile:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sections: {
        employment: [
          {
            date: '2019',
            title: 'UX designer',
            company: 'Microsoft',
            color: 'cyan'
          },
          {
            date: '2017',
            title: 'UX designer',
            company: 'Microsoft',
            color: 'cyan'
          },
          {
            date: '2016',
            title: 'UX designer',
            company: 'Microsoft',
            color: 'cyan'
          }
        ],
        education: [
          {
            date: '2015',
            university: 'Indiana University',
            degree: 'BS Computer Science',
            color: 'cyan'
          },
          {
            date: '2012',
            university: 'Ivy Tech Community College',
            degree: 'AA Psychology',
            color: 'cyan'
          }
        ],
        references: [
          {
            name: 'Kenny Crosbie',
            title: 'Video Manager',
            company: 'Take Two, Inc.',
            yearsKnown: '5',
            phone: '+1 (234) 567 8910',
            email: 'someaddress@gmail.com'
          },
          {
            name: 'Dale Carnegie',
            title: 'Lead Developer',
            company: 'Acme, Inc.',
            yearsKnown: '5',
            phone: '+1 (234) 567 8910',
            email: 'someaddress@gmail.com',
            website: 'https://google.com'
          },
          {
            name: 'Theodore Roosevelt',
            title: 'Technical Officer',
            company: 'Rockstar LLC',
            yearsKnown: '5',
            phone: '+1 (234) 567 8910',
            email: 'someaddress@gmail.com'
          }
        ],
        personal: {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          hobbies: [
            {
              id: '001-ice-cream',
              name: 'Ice cream'
            },
            {
              id: '002-bowling',
              name: 'Bowling'
            },
            {
              id: '003-toilet-paper',
              name: 'Pooping'
            },
            {
              id: '004-book',
              name: 'Reading'
            },
            {
              id: '005-television',
              name: 'Television'
            }
          ]
        },
        contact: {
          email: 'foobar@gmail.com',
          phone: '+12345678910',
          website: 'https://foo.bar',
          social: [
            {
              name: 'facebook',
              link: 'https://facebook.com/foobar'
            },
            {
              name: 'twitter',
              link: 'https://twitter.com/foobar'
            },
            {
              name: 'github',
              link: 'https://github.com/foobar'
            }
          ]
        }
      }
    };
  },
  computed: {
    skillsCurated() {
      return {
        skills: this.skills.slice(0, 3),
        additional: this.skills.slice(3)
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.cv-name
  font-family: 'Open Sans', sans-serif
  font-size: 44px
.cv-title
  font-family: 'Open Sans', sans-serif
  font-size: 22px
.cv-chip-additional
  background-color: $blue.base !important
  border-color: $blue.base !important
  &:hover
    background-color: $blue.darken-1 !important
    border-color: $blue.darken-1 !important
.cv-profile
  font-size: 18px
.cv-link
  margin: 0 $spacers.one.x
  i
    color: $blue.base
    &:hover
      color: $blue.darken-1
.section-header
  margin: 0 auto
  text-transform: uppercase
  font-weight: 800
  letter-spacing: 1px
.hobbies-layout,
.references-layout
  margin: 0 -24px !important
.spark
  position: absolute
  border-radius: 4px
  height: 6px
  background-color: orange
  animation: explode 1.5s infinite ease-out
.spark-container
  position: absolute
.spark-container-1
  top: 45%
  left: 0
  transform: rotate(-135deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 100ms
.spark-container-2
  top: 45%
  right: 0
  transform: rotate(-45deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 50ms
.spark-container-3
  top: 50%
  left: 0
  transform: rotate(-180deg)
  .spark
    animation-delay: 0ms
.spark-container-4
  top: 50%
  right: 0
  transform: rotate(0deg)
  .spark
    animation-delay: 50ms
.spark-container-5
  bottom: 45%
  left: 0
  transform: rotate(135deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 100ms
.spark-container-6
  bottom: 45%
  right: 0
  transform: rotate(45deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 150ms
.paper-wrap-right
  display: none
  position: absolute
  right: -47.9px
  top: 0
  height: 48px
  width: 48px
  background-color: $blue.lighten-1
  &:before
    content: ''
    position: absolute
    top: 48px
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 48px 48px 0 0
    border-color: $blue.darken-2 transparent transparent transparent
.paper-wrap-left
  position: absolute
.label-wrap
  position: relative
  width: calc(100% + 40px)
  left: -20px
  &:before
    content: ''
    position: absolute
    top: 48px
    left: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 0 20px 20px 0
    border-color: transparent $blue.darken-2 transparent transparent
  &:after
    content: ''
    position: absolute
    top: 48px
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 20px 20px 0 0
    border-color: $blue.darken-2 transparent transparent transparent

@media only screen and (min-width: 960px)
  .hobbies-layout,
  .references-layout
    margin: 0 -36px !important

@media only screen and (min-width: 600px)
  @keyframes explode
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 40px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
  @keyframes explode-smaller
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 30px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
@media only screen and (max-width: 599px)
  @keyframes explode
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 20px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(80px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(80px, 0)
  @keyframes explode-smaller
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 20px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(100px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(100px, 0)
</style>
