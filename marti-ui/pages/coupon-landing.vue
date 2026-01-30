<template>
  <div class="container mt-5">
    <h1>{{ t.title }}</h1>

    <p class="lead mt-3">
      {{ t.intro }}
    </p>

    <div class="actions mt-4 mb-4">
      <a href="https://www.martireisen.at/public/pdf/Gutschein.pdf?download=1" download class="btn btn-primary">
        {{ t.download }}
      </a>
    </div>

    <img src="https://www.martireisen.at/public/images/Gutschen Aciklama.png" alt="Coupon" style="width: 100%; height: auto; border: none;" />

    <div class="coupon-landing mt-5">
      <h2>{{ t.termsTitle }}</h2>
      <ul>
        <li>
          <strong>{{ t.terms.eligibilityLabel }}</strong>
          {{ t.terms.eligibilityText }}
        </li>
        <li>
          <strong>{{ t.terms.periodLabel }}</strong>
          {{ t.terms.periodText }}
        </li>
        <li>
          <strong>{{ t.terms.valueLabel }}</strong>
          {{ t.terms.valueText }}
        </li>
        <li>
          <strong>{{ t.terms.conditionsLabel }}</strong>
          {{ t.terms.conditionsText }}
        </li>
        <li>
          <strong>{{ t.terms.supportLabel }}</strong>
          {{ t.terms.supportText }}
        </li>
        <li>
          <strong>{{ t.terms.otherLabel }}</strong>
          {{ t.terms.otherText }}
        </li>
        <li>
          <strong>{{ t.terms.privacyLabel }}</strong>
          {{ t.terms.privacyText }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const storeLang = useCookie('store-language');
const locale = computed(() => storeLang.value || 'de');

const copy = {
  de: {
    title: 'Gutschein',
    intro:
      'Hier können Sie Ihren Gutschein bequem herunterladen. Zeigen Sie den Gutschein bei Ihrem Besuch im Reisebüro vor – unser Team hilft Ihnen gerne weiter.',
    download: 'Gutschein herunterladen',
    termsTitle: 'Teilnahmebedingungen für die Gutscheinaktion',
    terms: {
      eligibilityLabel: 'Teilnahmeberechtigung: ',
      eligibilityText:
        'Teilnahmeberechtigt sind alle Personen, die im Aktionszeitraum eine neue Pauschalreise oder Kreuzfahrt über das Reisebüro buchen.',
      periodLabel: 'Aktionszeitraum: ',
      periodText: 'Die Aktion gilt für Buchungen vom 16.01.2026 bis 28.02.2026.',
      valueLabel: 'Gutscheinwert: ',
      valueText:
        'Der Gutschein im Wert von bis zu 500 € wird als Market-Gutschein nach erfolgreicher Buchung einer Pauschalreise oder Kreuzfahrt ausgegeben.',
      conditionsLabel: 'Gutscheinbedingungen: ',
      conditionsText:
        'Der Market-Gutschein ist nicht übertragbar, nicht in bar auszahlbar und nicht auf zukünftige Reisebuchungen anrechenbar.',
      supportLabel: 'Telefonische Unterstützung: ',
      supportText:
        'Bei Fragen zur Gutscheinaktion oder zur Buchung erreichen Sie das Reisebüro unter 01 236 60 60.',
      otherLabel: 'Sonstige Bedingungen: ',
      otherText:
        'Die Aktion ist nur gültig, solange der Vorrat reicht, und kann jederzeit ohne vorherige Ankündigung geändert oder beendet werden.',
      privacyLabel: 'Datenschutz: ',
      privacyText:
        'Mit der Teilnahme erklärt sich der Teilnehmer einverstanden, dass seine Buchungsdaten zur Abwicklung der Aktion verwendet werden. Es gelten die Datenschutzbestimmungen.',
    },
  },
  tr: {
    title: 'HEDİYE ÇEKİ',
    intro:
      'Hediye çekinizi buradan kolayca indirebilirsiniz. Ofisimize geldiğinizde hediye çekini gösterin — ekibimiz size memnuniyetle yardımcı olur.',
    download: 'Hediye çekini indir',
    termsTitle: 'Hediye çeki kampanya koşulları',
    terms: {
      eligibilityLabel: 'Katılım koşulu: ',
      eligibilityText:
        'Kampanya döneminde acente üzerinden yeni bir paket tur veya kruvaziyer rezervasyonu yapan herkes kampanyaya katılabilir.',
      periodLabel: 'Kampanya süresi: ',
      periodText: 'Kampanya 16.01.2026 – 28.02.2026 tarihleri arasındaki rezervasyonlar için geçerlidir.',
      valueLabel: 'Çek tutarı: ',
      valueText:
        "500 €'ya kadar olan hediye çeki, paket tur veya kruvaziyer rezervasyonunun başarıyla tamamlanmasının ardından Market çeki olarak verilir.",
      conditionsLabel: 'Çek şartları: ',
      conditionsText:
        'Market çeki devredilemez, nakde çevrilemez ve gelecekteki seyahat rezervasyonlarına mahsup edilemez.',
      supportLabel: 'Telefon desteği: ',
      supportText:
        'Hediye çeki kampanyası veya rezervasyon ile ilgili sorularınız için 01 236 60 60 numaralı telefondan bize ulaşabilirsiniz.',
      otherLabel: 'Diğer şartlar: ',
      otherText:
        'Kampanya stoklarla sınırlıdır ve önceden bildirim yapılmaksızın değiştirilebilir veya sonlandırılabilir.',
      privacyLabel: 'Veri gizliliği: ',
      privacyText:
        'Katılım ile birlikte, rezervasyon bilgilerinizin kampanyanın yürütülmesi amacıyla kullanılmasını kabul etmiş olursunuz. Veri koruma politikaları geçerlidir.',
    },
  },
};

const t = computed(() => (locale.value === 'tr' ? copy.tr : copy.de));

useHead(() => ({
  title: `${t.value.title} - Martireisen`,
  meta: [
    {
      name: 'description',
      content:
        locale.value === 'de'
          ? 'Laden Sie Ihren Gutschein herunter und informieren Sie sich über die Teilnahmebedingungen.'
          : 'Hediye çekinizi indirin ve kampanya koşullarını inceleyin.',
    },
  ],
}));
</script>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.coupon-landing {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.coupon-landing h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 12px;
}

.coupon-landing ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.coupon-landing li {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.55;
}
</style>
