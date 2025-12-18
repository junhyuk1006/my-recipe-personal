import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface TermsScreenProps {
  onBack?: () => void;
}

export function TermsScreen({ onBack }: TermsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>이용약관</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제1조 (목적)</Text>
            <Text style={styles.sectionText}>
              본 약관은 마이레시피(이하 "회사")가 제공하는 요리 레시피 공유 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제2조 (정의)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. "서비스"란 회사가 제공하는 요리 레시피 작성, 공유, 검색 및 관련 기능을 의미합니다.</Text>
              <Text style={styles.sectionText}>2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</Text>
              <Text style={styles.sectionText}>3. "회원"이란 회사와 서비스 이용계약을 체결하고 회원 아이디(ID)를 부여받은 자를 말합니다.</Text>
              <Text style={styles.sectionText}>4. "레시피"란 회원이 서비스에 게시한 요리 방법, 재료, 사진 등의 콘텐츠를 말합니다.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</Text>
              <Text style={styles.sectionText}>2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</Text>
              <Text style={styles.sectionText}>3. 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 공지사항을 통해 공지합니다.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제4조 (서비스의 제공)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회사는 다음과 같은 서비스를 제공합니다:</Text>
              <Text style={styles.subItem}>• 레시피 작성 및 공유 서비스</Text>
              <Text style={styles.subItem}>• 레시피 검색 및 조회 서비스</Text>
              <Text style={styles.subItem}>• 냉장고 재료 관리 서비스</Text>
              <Text style={styles.subItem}>• 식단표 작성 및 관리 서비스</Text>
              <Text style={styles.subItem}>• 회원 간 소통 서비스 (댓글, 좋아요 등)</Text>
              <Text style={styles.sectionText}>2. 회사는 서비스의 내용을 변경하거나 추가할 수 있으며, 이 경우 사전에 공지합니다.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제5조 (회원가입)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회원가입은 이용자가 약관의 내용에 동의하고 회원가입 신청을 한 후 회사가 이를 승낙함으로써 체결됩니다.</Text>
              <Text style={styles.sectionText}>2. 회사는 다음 각 호에 해당하는 경우 회원가입을 거절하거나 승낙을 유보할 수 있습니다:</Text>
              <Text style={styles.subItem}>• 실명이 아니거나 타인의 정보를 도용한 경우</Text>
              <Text style={styles.subItem}>• 회원가입 신청서의 내용을 허위로 기재한 경우</Text>
              <Text style={styles.subItem}>• 부정한 용도로 서비스를 이용하고자 하는 경우</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제6조 (개인정보 보호)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다.</Text>
              <Text style={styles.sectionText}>2. 개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.</Text>
              <Text style={styles.sectionText}>3. 회사는 이용자의 귀책사유로 인해 노출된 개인정보에 대해서는 책임을 지지 않습니다.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제7조 (게시물의 저작권)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회원이 서비스에 게시한 레시피 및 콘텐츠의 저작권은 해당 회원에게 귀속됩니다.</Text>
              <Text style={styles.sectionText}>2. 회원은 자신이 게시한 게시물에 대한 책임을 지며, 타인의 저작권을 침해하지 않을 의무가 있습니다.</Text>
              <Text style={styles.sectionText}>3. 회사는 회원이 게시한 콘텐츠를 서비스 내에서 복제, 전송, 전시할 수 있는 권리를 갖습니다.</Text>
            </View>
          </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>제8조 (서비스 이용의 제한)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한하거나 중지할 수 있습니다:</Text>
              <Text style={styles.sectionText}>1. 타인의 개인정보를 도용한 경우</Text>
              <Text style={styles.sectionText}>2. 서비스의 안정적인 운영을 방해한 경우</Text>
              <Text style={styles.sectionText}>3. 공공질서 및 미풍양속에 반하는 내용을 게시한 경우</Text>
              <Text style={styles.sectionText}>4. 범죄적 행위에 관련되는 경우</Text>
              <Text style={styles.sectionText}>5. 타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제9조 (책임의 제한)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</Text>
              <Text style={styles.sectionText}>2. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</Text>
              <Text style={styles.sectionText}>3. 회사는 회원이 게시한 정보의 신뢰도, 정확성 등에 대해서는 책임을 지지 않습니다.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제10조 (분쟁의 해결)</Text>
            <View style={styles.list}>
              <Text style={styles.sectionText}>1. 회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 해야 합니다.</Text>
              <Text style={styles.sectionText}>2. 본 약관에 명시되지 않은 사항은 관련 법령에 따릅니다.</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              시행일: 2024년 1월 1일
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
      padding: 4,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
  },
  scrollContent: {
      padding: 16,
      paddingBottom: 40,
  },
  contentContainer: {
      gap: 24,
  },
  section: {
      gap: 12,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
  },
  sectionText: {
      fontSize: 14,
      color: '#374151',
      lineHeight: 22,
  },
  list: {
      gap: 8,
  },
  subItem: {
      fontSize: 14,
      color: '#374151',
      lineHeight: 22,
      paddingLeft: 16,
  },
  footer: {
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      alignItems: 'center',
  },
  footerText: {
      fontSize: 14,
      color: '#6b7280',
  },
});
