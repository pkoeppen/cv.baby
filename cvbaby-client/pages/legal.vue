<template>
  <div>
    <no-ssr>
      <navbar />
    </no-ssr>
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-divider />
      </v-flex>
      <v-flex class="mb-5" style="min-height: 100vh;" xs12 md5>
        <h1 class="display-1 text-xs-center my-5">Privacy Policy</h1>
        <p>
          <strong>Your privacy is important to us.</strong>
        </p>
        <p>
          It is cvbaby LLC's policy to respect your privacy regarding any
          information we may collect from you across our website,
          https://cv.baby, and other sites we own and operate. We only ask for
          personal information when we truly need it to provide a service to
          you. We collect it by fair and lawful means, with your knowledge and
          consent. We also let you know why we’re collecting it and how it will
          be used. We only retain collected information for as long as necessary
          to provide you with your requested service. The data we do store is
          protected within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use, or
          modification. We don’t share any personally identifying information
          publicly or with third-parties, except when required by law.
        </p>
        <p>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies. You are free to refuse our request
          for your personal information, with the understanding that we may be
          unable to provide you with some of your desired services. Your
          continued use of our website will be regarded as acceptance of our
          practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p>
          <strong>This policy is effective as of 21 July 2019.</strong>
        </p>
        <h1 class="display-1 text-xs-center my-5">Terms of Service</h1>
        <h3 class="title mb-3">1. Terms</h3>
        <p>
          By accessing the website at https://cv.baby, you are agreeing to be
          bound by these terms of service, all applicable laws and regulations,
          and agree that you are responsible for compliance with any applicable
          local laws. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site. The materials contained
          in this website are protected by applicable copyright and trademark
          law.
        </p>
        <h3 class="title mb-3 mt-4">2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on cvbaby LLC's website for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you may
          not: modify or copy the materials; use the materials for any
          commercial purpose, or for any public display (commercial or
          non-commercial); attempt to decompile or reverse engineer any software
          contained on cvbaby LLC's website; remove any copyright or other
          proprietary notations from the materials; or transfer the materials to
          another person or "mirror" the materials on any other server. This
          license shall automatically terminate if you violate any of these
          restrictions and may be terminated by cvbaby LLC at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </p>
        <h3 class="title mb-3 mt-4">3. Disclaimer</h3>
        <p>
          The materials on cvbaby LLC's website are provided on an 'as is'
          basis. cvbaby LLC makes no warranties, expressed or implied, and
          hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights. Further, cvbaby LLC does not
          warrant or make any representations concerning the accuracy, likely
          results, or reliability of the use of the materials on its website or
          otherwise relating to such materials or on any sites linked to this
          site.
        </p>
        <h3 class="title mb-3 mt-4">4. Limitations</h3>
        <p>
          In no event shall cvbaby LLC or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on cvbaby LLC's website, even if cvbaby
          LLC or a cvbaby LLC authorized representative has been notified orally
          or in writing of the possibility of such damage. Because some
          jurisdictions do not allow limitations on implied warranties, or
          limitations of liability for consequential or incidental damages,
          these limitations may not apply to you.
        </p>
        <h3 class="title mb-3 mt-4">5. Accuracy of materials</h3>
        <p>
          The materials appearing on cvbaby LLC's website could include
          technical, typographical, or photographic errors. cvbaby LLC does not
          warrant that any of the materials on its website are accurate,
          complete or current. cvbaby LLC may make changes to the materials
          contained on its website at any time without notice. However cvbaby
          LLC does not make any commitment to update the materials.
        </p>
        <h3 class="title mb-3 mt-4">6. Links</h3>
        <p>
          cvbaby LLC has not reviewed all of the sites linked to its website and
          is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by cvbaby LLC of the
          site. Use of any such linked website is at the user's own risk.
        </p>
        <h3 class="title mb-3 mt-4">7. Modifications</h3>
        <p>
          cvbaby LLC may revise these terms of service for its website at any
          time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </p>
        <h3 class="title mb-3 mt-4">8. Governing Law</h3>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of Wyoming and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
        <h1 class="display-1 text-xs-center my-5">
          Refund &amp; Cancellation Policy
        </h1>
        <p>
          <strong>We do not process refunds of any kind.</strong> If you wish to
          cancel your subscription, you may do so at any time by visiting your
          account dashboard and clicking "Cancel Subscription". Cancellation is
          immediate and will terminate access to all services with no proration
          or refund for any time remaining in the billing period, until you
          choose to renew your subscription. If you are dissatisfied with the
          service we have provided, please contact us at
          <a href="mailto:feedback@cv.baby">feedback@cv.baby</a> and let us know
          what we did wrong!
        </p>
      </v-flex>
    </v-layout>
    <cv-footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import cvFooter from '~/components/Footer';
export default {
  components: {
    Navbar,
    cvFooter
  }
};
</script>
<style lang="stylus" scoped></style>
